"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../../controllers/shop/cart.controller");
const router = (0, express_1.Router)();
router.post('/addtocart', cart_controller_1.addToCart);
router.get('/get/:userId', cart_controller_1.fetchCartItems);
router.put('/update-cart', cart_controller_1.updateCartIemQty);
router.delete('/:userId/:productId', cart_controller_1.deleteCartITems);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map