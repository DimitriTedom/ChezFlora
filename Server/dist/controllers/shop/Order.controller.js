"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.getAllOrdersByUser = exports.capturePayment = exports.createOrder = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const paypal_service_1 = require("../../services/paypal.service");
const paypal_1 = __importDefault(require("../../Helpers/paypal"));
const createOrder = async (req, res) => {
    try {
        const { userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId } = req.body;
        const paymentData = (0, paypal_service_1.createPayPalPayment)(cartItems, totalAmount);
        paypal_1.default.payment.create(paymentData, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error:", error);
                return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error while creating payment",
                });
            }
            const newlyCreatedOrder = await auth_controller_1.prisma.order.create({
                data: {
                    userId, cartId, cartItems, addressInfo, orderStatus,
                    paymentMethod, paymentStatus, totalAmount, orderDate,
                    orderUpdateDate, paymentId, payerId
                },
            });
            const approvalURL = paymentInfo.links?.find(link => link.rel === "approval_url")?.href;
            res.status(constants_1.HttpCode.CREATED).json({
                success: true,
                message: "Payment Order Created Successfully",
                approvalURL,
                orderId: newlyCreatedOrder.id,
            });
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.createOrder = createOrder;
const capturePayment = async (req, res) => {
    try {
        // we nedd to get the payemtId,payerId and orderID
        const { paymentId, payerId, orderId } = req.body;
        const order = await auth_controller_1.prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }
        await (0, paypal_service_1.executePayPalPayment)(paymentId, payerId);
        // Delete the cart after successful payment
        await auth_controller_1.prisma.cart.delete({ where: { id: order.cartId } });
        // Update order status
        const updatedOrder = await auth_controller_1.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: "PAID", orderStatus: "APPROVED", paymentId, payerId },
        });
        for (const item of order.cartItems) {
            const product = await auth_controller_1.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) {
                return res.status(constants_1.HttpCode.NOT_FOUND).json({
                    success: false,
                    message: `Not enough stock for ${product?.name}`
                });
            }
            await auth_controller_1.prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: product.stock -= item.quantity
                }
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: `Order ${updatedOrder.id} confirmed successfully`,
            data: updatedOrder,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.capturePayment = capturePayment;
const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await auth_controller_1.prisma.order.findMany({ where: { userId } });
        if (!orders) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "No Orders found",
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getAllOrdersByUser = getAllOrdersByUser;
const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await auth_controller_1.prisma.order.findUnique({ where: { id } });
        if (!order) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getOrderDetails = getOrderDetails;
//# sourceMappingURL=Order.controller.js.map