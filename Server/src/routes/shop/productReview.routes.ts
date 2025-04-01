import { Router } from 'express';
import { addProductReview, getProductReview } from '../../controllers/shop/productReview.controller';
const router = Router();

router.post('/add',addProductReview);
router.get('/get/:productId',getProductReview);

export default router