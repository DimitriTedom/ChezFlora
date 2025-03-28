import { Router } from 'express';
import { capturePayment, createOrder } from '../../controllers/shop/Order.controller';
const router = Router();

router.post('/create',createOrder);
router.post('/capture',capturePayment);


export default router