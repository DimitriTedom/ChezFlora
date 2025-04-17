"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Quote_controller_1 = require("../../controllers/admin/Quote.controller");
const router = (0, express_1.Router)();
router.get('/get', Quote_controller_1.getAllQuotesofAllUsers);
router.get('/details/:id', Quote_controller_1.getQuotesDetailsForAdmin);
router.put('/update/:id', Quote_controller_1.updateQuotesRequestStatus);
exports.default = router;
//# sourceMappingURL=QuoteRequest.routes.js.map