"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../../controllers/admin/products.controller");
const cloudinary_1 = require("../../Helpers/cloudinary");
const router = (0, express_1.Router)();
router.post('/upload-image', cloudinary_1.upload.single('my_file'), products_controller_1.handleImageUpload);
router.post('/add', products_controller_1.addProduct);
router.put('/edit/:id', products_controller_1.editProducts);
router.get('/get', products_controller_1.fetchAllProducts);
router.delete('/delete/:id', products_controller_1.deleteProducts);
exports.default = router;
//# sourceMappingURL=products.routes.js.map