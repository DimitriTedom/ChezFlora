"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuotesRequestStatus = exports.handleServerError = exports.getQuotesDetailsForAdmin = exports.getAllQuotesofAllUsers = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const getAllQuotesofAllUsers = async (req, res) => {
    try {
        const quotes = await auth_controller_1.prisma.quoteRequest.findMany({});
        if (!quotes) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'No quotes found'
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'quotes fetched successfully',
            data: quotes
        });
    }
    catch (error) {
        console.error('Error collecting All quote requests:', error);
        (0, exports.handleServerError)(res, error);
    }
};
exports.getAllQuotesofAllUsers = getAllQuotesofAllUsers;
const getQuotesDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await auth_controller_1.prisma.quoteRequest.findUnique({ where: { id } });
        if (!quote) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'quote not found'
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'quote fetched successfully',
            data: quote
        });
    }
    catch (error) {
        console.error('Error collecting quote request DEtail:', error);
        (0, exports.handleServerError)(res, error);
    }
};
exports.getQuotesDetailsForAdmin = getQuotesDetailsForAdmin;
const handleServerError = (res, error) => {
    if (error instanceof Error) {
        if (error.message.includes('prisma')) {
            return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Database operation failed',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
    res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error'
    });
};
exports.handleServerError = handleServerError;
const updateQuotesRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminResponse } = req.body;
        const quote = await auth_controller_1.prisma.quoteRequest.findUnique({ where: { id } });
        if (!quote) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'quote not found'
            });
        }
        const updatequote = await auth_controller_1.prisma.quoteRequest.update({
            where: { id },
            data: {
                status,
                adminResponse
            }
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: `${updatequote.id} updated succesfully !`
        });
    }
    catch (error) {
        console.error('Error updating quote status:', error);
        (0, exports.handleServerError)(res, error);
    }
};
exports.updateQuotesRequestStatus = updateQuotesRequestStatus;
//# sourceMappingURL=Quote.controller.js.map