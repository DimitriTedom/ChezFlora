import { Router } from 'express';
import { SearchProducts } from '../../controllers/shop/Search.controller';

const router = Router();

router.get('/:keyword', SearchProducts);

export default router;
