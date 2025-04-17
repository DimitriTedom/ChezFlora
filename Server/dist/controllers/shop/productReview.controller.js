"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReview = exports.addProductReview = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const addProductReview = async (req, res) => {
    try {
        const { productId, userId, content, rating, userName } = req.body;
        if (!productId || !userId || !content || !rating || rating < 1 || rating > 5 || !userName) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const order = await auth_controller_1.prisma.order.findFirst({ where: { userId, cartItems: { some: { productId } }, paymentStatus: "PAID" } });
        if (!order) {
            return res.status(constants_1.HttpCode.FORBIDDEN).json({
                success: false,
                message: "You can't review a product you didn't buy!",
            });
        }
        const checkExistingReview = await auth_controller_1.prisma.productReview.findFirst({ where: { productId, userId } });
        if (checkExistingReview) {
            return res.status(constants_1.HttpCode.FORBIDDEN).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }
        const newReview = await auth_controller_1.prisma.productReview.create({
            data: {
                productId,
                userId,
                content,
                rating,
                userName
            }
        });
        const reviews = await auth_controller_1.prisma.productReview.findMany({ where: { productId } });
        const totalReviewLength = reviews.length;
        const averageReview = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviewLength;
        await auth_controller_1.prisma.product.update({
            where: { id: productId },
            data: {
                averageReview,
            }
        });
        res.status(constants_1.HttpCode.CREATED).json({
            success: true,
            message: "Product review added successfully!",
            data: newReview,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.addProductReview = addProductReview;
const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await auth_controller_1.prisma.productReview.findMany({ where: { productId } });
        if (!reviews) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "No Reviews found",
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getProductReview = getProductReview;
//# sourceMappingURL=productReview.controller.js.map