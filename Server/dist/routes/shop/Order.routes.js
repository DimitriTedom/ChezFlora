"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_controller_1 = require("../../controllers/shop/Order.controller");
const router = (0, express_1.Router)();
router.post('/create', Order_controller_1.createOrder);
router.post('/capture', Order_controller_1.capturePayment);
router.get('/list/:userId', Order_controller_1.getAllOrdersByUser);
router.get('/details/:id', Order_controller_1.getOrderDetails);
exports.default = router;
//# sourceMappingURL=Order.routes.js.map