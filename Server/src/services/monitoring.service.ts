// Simple console-based logging (Winston can be added later)
import { Request, Response, NextFunction } from 'express';
import { envs } from '../core/config/env';

// Simple logger implementation
export const logger = {
  info: (message: string, meta?: any) => {
    if (envs.LOG_LEVEL === 'info' || envs.LOG_LEVEL === 'debug') {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta || '');
    }
  },
  warn: (message: string, meta?: any) => {
    if (['warn', 'info', 'debug'].includes(envs.LOG_LEVEL)) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
    }
  },
  error: (message: string, meta?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta || '');
  },
  debug: (message: string, meta?: any) => {
    if (envs.LOG_LEVEL === 'debug') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta || '');
    }
  }
};

// Performance monitoring metrics
interface MetricData {
  timestamp: number;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
}

class PerformanceMonitor {
  private metrics: MetricData[] = [];
  private readonly maxMetrics = 10000; // Keep last 10k metrics in memory

  addMetric(data: MetricData) {
    this.metrics.push(data);
    
    // Keep only the latest metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log slow requests
    if (data.responseTime > 1000) {
      logger.warn('Slow request detected', {
        endpoint: data.endpoint,
        method: data.method,
        responseTime: data.responseTime,
        statusCode: data.statusCode,
        userId: data.userId,
      });
    }

    // Log errors
    if (data.statusCode >= 400) {
      logger.error('Error response', {
        endpoint: data.endpoint,
        method: data.method,
        statusCode: data.statusCode,
        responseTime: data.responseTime,
        userId: data.userId,
        ip: data.ip,
      });
    }
  }

  getStats(timeWindow: number = 3600000) { // Default 1 hour
    const now = Date.now();
    const windowStart = now - timeWindow;
    const windowMetrics = this.metrics.filter(m => m.timestamp >= windowStart);

    if (windowMetrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        slowRequests: 0,
      };
    }

    const totalRequests = windowMetrics.length;
    const averageResponseTime = windowMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests;
    const errorRequests = windowMetrics.filter(m => m.statusCode >= 400).length;
    const slowRequests = windowMetrics.filter(m => m.responseTime > 1000).length;

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      errorRate: Math.round((errorRequests / totalRequests) * 100),
      slowRequests,
      timeWindow: timeWindow / 1000 / 60, // in minutes
    };
  }

  getTopSlowEndpoints(limit: number = 10) {
    const endpointStats = new Map<string, { count: number; totalTime: number }>();

    this.metrics.forEach(metric => {
      const key = `${metric.method} ${metric.endpoint}`;
      const existing = endpointStats.get(key) || { count: 0, totalTime: 0 };
      endpointStats.set(key, {
        count: existing.count + 1,
        totalTime: existing.totalTime + metric.responseTime,
      });
    });

    return Array.from(endpointStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        averageResponseTime: Math.round(stats.totalTime / stats.count),
        requestCount: stats.count,
      }))
      .sort((a, b) => b.averageResponseTime - a.averageResponseTime)
      .slice(0, limit);
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log request start
  if (envs.ENABLE_REQUEST_LOGGING) {
    logger.info('Request started', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id,
    });
  }

  // Capture response completion
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    
    // Add metric
    performanceMonitor.addMetric({
      timestamp: Date.now(),
      endpoint: req.route?.path || req.url,
      method: req.method,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id,
    });

    // Log request completion
    if (envs.ENABLE_REQUEST_LOGGING) {
      logger.info('Request completed', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime,
        userId: req.user?.id,
      });
    }
  });

  next();
};

// Security event logger
export const logSecurityEvent = (event: string, details: any, req?: Request) => {
  logger.warn('Security event', {
    event,
    ...details,
    ip: req?.ip,
    userAgent: req?.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });
};

// Health check endpoint data
export const getHealthStatus = () => {
  const stats = performanceMonitor.getStats();
  const memoryUsage = process.memoryUsage();
  
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    performance: stats,
    memory: {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      external: Math.round(memoryUsage.external / 1024 / 1024), // MB
    },
    environment: envs.NODE_ENV,
  };
};