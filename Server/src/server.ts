// src/server.ts
// Configurations de Middlewares
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import morgan from 'morgan';
import { HttpCode, ONE_HUNDRED, SIXTY } from './core/constants';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/auth.routes';
import adminProductsRouter from './routes/admin/products.routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
dotenv.config();
const app = express();
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// My Routes
app.use('/api/auth', AuthRoutes);
app.use(helmet());

app.use(
	rateLimit({
		max: ONE_HUNDRED,
		windowMs: SIXTY,
		message: 'Excess requests from this IP Adresse '
	})
);
app.use((req, res, next) => {
	req.setTimeout(5000, () => {
		res.status(HttpCode.REQUEST_TIMEOUT).json({
			success: false,
			message: 'Request timed out'
		});
	});
	next();
});

app.use('/api/admin/products', adminProductsRouter);
app.use((req, res, next) => {
	if (req.path === '/api/admin/products/upload-image') {
	  req.setTimeout(10000); // 10s timeout pour les uploads
	}
	next();
  });
app.use(morgan('combined'));

setupSwagger(app);
export default app;
