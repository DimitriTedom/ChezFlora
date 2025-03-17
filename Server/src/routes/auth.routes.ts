import { Router } from 'express';
import { register, login,logout } from '../controllers/auth.controller';
import { HttpCode } from '../core/constants';
import { authenticateUser } from '../middlewares/auth.middleware';
// import { authenticateUser } from '../middlewares/auth.middleware';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/checkauth', authenticateUser, (req, res)=>{
    const user = (req as any).user; 
    res.status(HttpCode.OK).json({
        success:true,
        message:'User is authenticated',
        user:{
            id:user.id,
            email:user.email,
            role:user.role,
            name:user.name
        }
    })
});


export default router;
