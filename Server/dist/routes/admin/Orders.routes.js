"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_controller_1 = require("../../controllers/admin/Order.controller");
const router = (0, express_1.Router)();
router.get('/get', Order_controller_1.getAllOrdersofAllUsers);
router.get('/details/:id', Order_controller_1.getOrderDetailsForAdmin);
router.put('/update/:id', Order_controller_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=Orders.routes.js.map