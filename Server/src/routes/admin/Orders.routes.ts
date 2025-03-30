import { Router } from 'express';
import { getAllOrdersofAllUsers,getOrderDetailsForAdmin,updateOrderStatus } from '../../controllers/admin/Order.controller';
const router = Router();

router.get('/get',getAllOrdersofAllUsers);
router.get('/details/:id',getOrderDetailsForAdmin);
router.put('/update/:id',updateOrderStatus);

export default router