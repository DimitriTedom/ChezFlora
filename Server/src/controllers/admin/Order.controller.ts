import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";

export const getAllOrdersofAllUsers = async (req: Request, res: Response) => {
    try { 

        const orders = await prisma.order.findMany({});
        if (!orders) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "No Orders found",
            });
        }
        console.log(orders);
        res.status(HttpCode.OK).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error: unknown) {
        console.error("Error capturing payment:", error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};


export const getOrderDetailsForAdmin = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const order = await prisma.order.findUnique({where:{id}});
        if (!order) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(HttpCode.OK).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (error: unknown) {
        console.error("Error capturing payment:", error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;

        const order = await prisma.order.findUnique({where:{id}});
        if (!order) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }
        const updateOrder = await prisma.order.update({
            where: {id},
            data: {orderStatus}
        });
        res.status(HttpCode.OK).json({
            success:true,
            message:`${updateOrder.id} updated succesfully !`
        })
    } catch (error: unknown) {
        console.error("Error capturing payment:", error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
