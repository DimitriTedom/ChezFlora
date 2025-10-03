import request from 'supertest';
import { app } from '../src/app';

describe('Production Readiness Integration Tests', () => {
  
  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('x-xss-protection');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits on auth endpoints', async () => {
      const promises = [];
      
      // Make 7 rapid login attempts (limit should be 5)
      for (let i = 0; i < 7; i++) {
        promises.push(
          request(app)
            .post('/api/auth/login')
            .send({
              email: 'test@test.com',
              password: 'wrongpassword'
            })
        );
      }

      const responses = await Promise.all(promises);
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Health Monitoring', () => {
    it('should provide health status endpoint', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        performance: expect.any(Object),
        memory: expect.any(Object),
        environment: expect.any(String),
      });
    });

    it('should track performance metrics', async () => {
      // Make some requests to generate metrics
      await request(app).get('/health');
      await request(app).get('/health');
      await request(app).get('/health');

      const response = await request(app)
        .get('/api/admin/monitoring')
        .expect(200);

      expect(response.body).toMatchObject({
        health: expect.any(Object),
        performance: {
          last24h: expect.any(Object),
          lastHour: expect.any(Object),
          slowEndpoints: expect.any(Array),
        }
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate registration input comprehensively', async () => {
      const invalidInputs = [
        {
          name: '', // empty name
          email: 'invalid-email',
          password: '123', // weak password
          phone: 'invalid',
          address: 'Test Address'
        },
        {
          name: 'Test User',
          email: 'test@test.com',
          password: 'ValidPass123!',
          phone: '+1234567890',
          address: '' // empty address
        }
      ];

      for (const input of invalidInputs) {
        const response = await request(app)
          .post('/api/auth/register')
          .send(input)
          .expect(400);

        expect(response.body.success).toBe(false);
      }
    });

    it('should validate contact form input', async () => {
      const invalidContact = {
        name: '', // empty name
        email: 'invalid-email',
        phone: '',
        address: '',
        subject: '',
        message: ''
      };

      const response = await request(app)
        .post('/api/shop/contact')
        .send(invalidContact)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('CORS Configuration', () => {
    it('should handle CORS properly', async () => {
      const response = await request(app)
        .options('/health')
        .set('Origin', 'http://localhost:5173')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
      expect(response.headers['access-control-allow-credentials']).toBe('true');
    });

    it('should reject unauthorized origins', async () => {
      await request(app)
        .get('/health')
        .set('Origin', 'http://malicious-site.com')
        .expect(500); // Should be blocked by CORS
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', async () => {
      const response = await request(app)
        .get('/non-existent-endpoint')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send('{"invalid": json}')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('Performance Benchmarks', () => {
    it('should respond to health check within acceptable time', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/health')
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(500); // Should respond within 500ms
    });

    it('should handle concurrent requests efficiently', async () => {
      const concurrentRequests = 10;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(request(app).get('/health'));
      }

      const startTime = Date.now();
      const responses = await Promise.all(promises);
      const totalTime = Date.now() - startTime;

      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Total time should be reasonable for concurrent requests
      expect(totalTime).toBeLessThan(2000); // 2 seconds for 10 concurrent requests
    });
  });
});