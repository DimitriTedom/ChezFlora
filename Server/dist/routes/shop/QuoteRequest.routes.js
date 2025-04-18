"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuoteRequest_controller_1 = require("../../controllers/shop/QuoteRequest.controller");
const router = (0, express_1.Router)();
router.post('/add', QuoteRequest_controller_1.addQuoteRequest);
router.get('/get/:userId', QuoteRequest_controller_1.fetchAllQuoteRequests);
router.get('/details/:id', QuoteRequest_controller_1.getQuoteRequestDetail);
exports.default = router;
//# sourceMappingURL=QuoteRequest.routes.js.map