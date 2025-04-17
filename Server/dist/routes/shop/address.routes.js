"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../../controllers/shop/address.controller");
const router = (0, express_1.Router)();
router.post('/add', address_controller_1.addAdresss);
router.get('/get/:userId', address_controller_1.fetchAllAdress);
router.delete('/delete/:userId/:addressId', address_controller_1.deleteAdresss);
router.put('/update/:userId/:addressId', address_controller_1.editAdresss);
exports.default = router;
//# sourceMappingURL=address.routes.js.map