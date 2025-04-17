"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Search_controller_1 = require("../../controllers/shop/Search.controller");
const router = (0, express_1.Router)();
router.get('/:keyword', Search_controller_1.SearchProducts);
exports.default = router;
//# sourceMappingURL=search.routes.js.map