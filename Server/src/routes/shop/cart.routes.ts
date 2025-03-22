import { Router } from 'express';
import { addToCart, fetchCartItems,updateCartIemQty,deleteCartITems } from '../../controllers/shop/cart.controller';


const router = Router();

router.post('/addtocart', addToCart);
router.get('/get/:userId',fetchCartItems)
router.put('/update-cart',updateCartIemQty)
router.delete('/:userId/:productId',deleteCartITems)

export default router;
