import { Router } from 'express';
import { getAllOrdersofAllUsers,getOrderDetailsForAdmin } from '../../controllers/admin/Order.controller';
const router = Router();

router.get('/get',getAllOrdersofAllUsers);
router.get('/details/:id',getOrderDetailsForAdmin);

export default router