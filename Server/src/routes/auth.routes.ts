import { Router } from 'express';
import { register, login,logout, checkUser, updatePassword, verifyOtp } from '../controllers/auth.controller';
import { HttpCode } from '../core/constants';
import { authenticateUser } from '../middlewares/auth.middleware';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post("/check-user",checkUser);
router.post("/update-password",updatePassword);
router.post('/logout', logout);
router.post('/verify-otp',verifyOtp)
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
