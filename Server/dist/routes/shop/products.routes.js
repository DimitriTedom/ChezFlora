"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = require("../../controllers/shop/Product.controller");
const router = (0, express_1.Router)();
router.get('/get', Product_controller_1.getFiltereProducts);
router.get('/get/:id', Product_controller_1.getProductDetails);
exports.default = router;
//# sourceMappingURL=products.routes.js.map