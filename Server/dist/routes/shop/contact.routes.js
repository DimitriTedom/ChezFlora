"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../../controllers/shop/contact.controller");
const router = (0, express_1.Router)();
router.post('/send', contact_controller_1.sendContactIssue);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map