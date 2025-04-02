// src/server.ts
// Configurations de Middlewares
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
app.use('/api/shop/products',getFiltereProductsRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/cart',shopProductsRouter)
app.use('/api/shop/address',shopAdressRouter);
app.use('/api/shop/order',shopOrderRouter);
app.use('/api/admin/orders',AdminOrderRouter);
app.use('/api/shop/search',SearchProductsRouter)
app.use('/api/shop/review',shopProductsReviewRouter)
app.use('/api/shop/contact',shopContactRouter)
app.use(morgan('combined'));

setupSwagger(app);
export default app;
