"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/admin/user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/get', auth_middleware_1.authenticateUser, auth_middleware_1.authorizeAdmin, user_controller_1.getAllUsers);
router.post('/create', auth_middleware_1.authenticateUser, auth_middleware_1.authorizeAdmin, user_controller_1.createUser);
router.patch('/update-roles', auth_middleware_1.authenticateUser, auth_middleware_1.authorizeAdmin, user_controller_1.updateUserRoles);
router.delete('/delete', auth_middleware_1.authenticateUser, auth_middleware_1.authorizeAdmin, user_controller_1.deleteUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map