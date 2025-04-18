"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderDetailsForAdmin = exports.getAllOrdersofAllUsers = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const getAllOrdersofAllUsers = async (req, res) => {
    try {
        const orders = await auth_controller_1.prisma.order.findMany({});
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
        console.error("Error capturing payment:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getAllOrdersofAllUsers = getAllOrdersofAllUsers;
const getOrderDetailsForAdmin = async (req, res) => {
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
        console.error("Error capturing payment:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getOrderDetailsForAdmin = getOrderDetailsForAdmin;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const order = await auth_controller_1.prisma.order.findUnique({ where: { id } });
        if (!order) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }
        const updateOrder = await auth_controller_1.prisma.order.update({
            where: { id },
            data: { orderStatus }
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: `${updateOrder.id} updated succesfully !`
        });
    }
    catch (error) {
        console.error("Error capturing payment:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=Order.controller.js.map