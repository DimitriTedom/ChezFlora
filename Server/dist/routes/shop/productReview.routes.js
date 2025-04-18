"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productReview_controller_1 = require("../../controllers/shop/productReview.controller");
const router = (0, express_1.Router)();
router.post('/add', productReview_controller_1.addProductReview);
router.get('/get/:productId', productReview_controller_1.getProductReview);
exports.default = router;
//# sourceMappingURL=productReview.routes.js.map