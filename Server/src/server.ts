// src/server.ts
// Enhanced Security & Middleware Configuration
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import morgan from 'morgan';
import { ONE_HUNDRED, SIXTY } from './core/constants';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/auth.routes';
import adminProductsRouter from './routes/admin/products.routes';
import getFiltereProductsRouter from './routes/shop/products.routes';
import shopProductsRouter from './routes/shop/cart.routes'
import shopAdressRouter from './routes/shop/address.routes'
import shopOrderRouter from './routes/shop/Order.routes'
import AdminOrderRouter from './routes/admin/Orders.routes'
import SearchProductsRouter from './routes/shop/search.routes'
import shopProductsReviewRouter from './routes/shop/productReview.routes'
import shopContactRouter from './routes/shop/contact.routes'
import shopQuoteRequestRouter from './routes/shop/QuoteRequest.routes'
import adminQuoteRequestRouter from './routes/admin/QuoteRequest.routes'
import adminUserRouter from './routes/admin/user.routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { exportUsersAsCSV } from './controllers/admin/exportUsersAsCSV';
import { requestLogger, getHealthStatus, logger, performanceMonitor } from './services/monitoring.service';
import { envs } from './core/config/env';

dotenv.config();
const app = express();

// Enhanced Security Headers
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
			fontSrc: ["'self'", "https://fonts.gstatic.com"],
			imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
			scriptSrc: ["'self'"],
			connectSrc: ["'self'"],
		},
	},
	crossOriginEmbedderPolicy: false,
}));

// Enhanced CORS Configuration
app.use(
	cors({
		origin: function (origin, callback) {
			const allowedOrigins = [
				process.env.ORIGIN,
				envs.CLIENT_BASE_URL,
				'http://localhost:3000',
				'http://localhost:5173',
				'http://localhost:5174',
				'http://localhost:5175',
				'http://localhost:5176'
			].filter(Boolean);
			
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
		credentials: true,
		maxAge: 86400, // 24 hours
	})
);

// Request logging and monitoring
app.use(requestLogger);

// Enhanced Rate Limiting
const authLimiter = rateLimit({
	windowMs: envs.RATE_LIMIT_WINDOW_MS, // from env config
	max: envs.AUTH_RATE_LIMIT_MAX_REQUESTS, // from env config
	message: 'Too many authentication attempts, please try again later',
	standardHeaders: true,
	legacyHeaders: false,
});

const generalLimiter = rateLimit({
	windowMs: envs.RATE_LIMIT_WINDOW_MS, // from env config
	max: envs.RATE_LIMIT_MAX_REQUESTS, // from env config
	message: 'Too many requests from this IP, please try again later',
	standardHeaders: true,
	legacyHeaders: false,
});

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// Logging
app.use(morgan('combined'));

// Apply rate limiting
app.use('/api/auth', authLimiter);
app.use(generalLimiter);

// Health check and monitoring endpoints
app.get('/health', (req, res) => {
	res.status(200).json(getHealthStatus());
});

app.get('/api/admin/monitoring', (req, res) => {
	// This should be protected with admin auth in production
	res.status(200).json({
		health: getHealthStatus(),
		performance: {
			last24h: performanceMonitor.getStats(24 * 60 * 60 * 1000),
			lastHour: performanceMonitor.getStats(60 * 60 * 1000),
			slowEndpoints: performanceMonitor.getTopSlowEndpoints(10),
		}
	});
});

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/shop/products',getFiltereProductsRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/cart',shopProductsRouter)
app.use('/api/shop/address',shopAdressRouter);
app.use('/api/shop/order',shopOrderRouter);
app.use('/api/admin/orders',AdminOrderRouter);
app.use('/api/shop/search',SearchProductsRouter)
app.use('/api/shop/review',shopProductsReviewRouter)
app.use('/api/shop/contact',shopContactRouter)
app.use('/api/shop/quote',shopQuoteRequestRouter)
app.use('/api/admin/quotes',adminQuoteRequestRouter);
app.use('/api/admin/users', adminUserRouter);
app.use('/api/admin/users/export',exportUsersAsCSV)
app.use(morgan('combined'));

setupSwagger(app);
export default app;
