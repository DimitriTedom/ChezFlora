"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const constants_1 = require("../core/constants");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register/initiate', auth_controller_1.initiateRegistration);
router.post('/register/complete', auth_controller_1.completeRegistration);
router.post('/login', auth_controller_1.login);
router.post("/check-user", auth_controller_1.checkUser);
router.post("/check-pending-user", auth_controller_1.checkPendingUser);
router.post("/update-password", auth_controller_1.updatePassword);
router.post('/logout', auth_controller_1.logout);
router.post('/verify-otp', auth_controller_1.verifyOtp);
router.get('/checkauth', auth_middleware_1.authenticateUser, (req, res) => {
    const user = req.user;
    res.status(constants_1.HttpCode.OK).json({
        success: true,
        message: 'User is authenticated',
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map