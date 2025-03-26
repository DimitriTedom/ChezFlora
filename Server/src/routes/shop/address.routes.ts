import { Router } from 'express';
import { addAdresss, fetchAllAdress,editAdresss,deleteAdresss } from '../../controllers/shop/address.controller';
const router = Router();

router.post('/add',addAdresss);
router.get('/get/:userId',fetchAllAdress);
router.delete('/delete/:userId/:addressId',deleteAdresss)
router.put('/update/:userId/:addressId',editAdresss)
export default router;
