import { Router } from 'express';
import { getFiltereProducts } from '../../controllers/shop/Product.controller';


const router = Router();

router.get('/get', getFiltereProducts);

export default router;
