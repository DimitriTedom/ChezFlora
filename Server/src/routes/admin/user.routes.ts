import { Router } from 'express';
import { deleteUsers, getAllUsers, updateUserRoles } from '../../controllers/admin/user.controller';
import { authenticateUser, authorizeAdmin } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/get',authenticateUser, authorizeAdmin, getAllUsers);
router.patch('/update-roles',authenticateUser, authorizeAdmin,updateUserRoles);
router.delete('/delete',authenticateUser, authorizeAdmin, deleteUsers);

export default router