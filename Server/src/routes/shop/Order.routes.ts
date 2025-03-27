import { Router } from 'express';
import { createOrder } from '../../controllers/shop/Order.controller';
const router = Router();

router.post('/create',createOrder);

export default router