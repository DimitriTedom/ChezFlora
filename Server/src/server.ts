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
import { authenticateUser } from './middlewares/auth.middleware';

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// My Routes
app.use('/api/auth', AuthRoutes);
// Authentification Middleware for secured routes
app.get('/api/user', authenticateUser, (req, res) => {
	res.json(req.user);
});
app.use(
	rateLimit({
		max: ONE_HUNDRED,
		windowMs: SIXTY,
		message: 'Trop de Requete à partir de cette adresse IP '
	})
);
app.use(morgan('combined'));

setupSwagger(app);
export default app;
