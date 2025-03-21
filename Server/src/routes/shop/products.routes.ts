import { Router } from 'express';
import { getFiltereProducts, getProductDetails } from '../../controllers/shop/Product.controller';


const router = Router();

router.get('/get', getFiltereProducts);
router.get('/get/:id',getProductDetails)

export default router;
