"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.authorizeAdmin = exports.authenticateUser = void 0;
const zod_1 = require("zod");
const constants_1 = require("../core/constants");
const jwt_1 = require("../utils/jwt");
const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(constants_1.HttpCode.UNAUTHORIZED).json({
            success: false,
            message: 'Authentication required'
        });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded)
            throw new Error('Invalid token');
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
            createdAt: decoded.createdAt,
            updatedAt: decoded.updatedAt
        };
        next();
    }
    catch (error) {
        res.status(constants_1.HttpCode.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(constants_1.HttpCode.FORBIDDEN).json({
            success: false,
            message: 'Admin privileges required'
        });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const errorHandler = (error, res) => {
    if (error instanceof zod_1.z.ZodError) {
        return res.status(constants_1.HttpCode.BAD_REQUEST).json({
            success: false,
            message: 'Validation failed',
            errors: error.errors.map((err) => err.message)
        });
    }
    console.error(error);
    res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error occurred'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=auth.middleware.js.map