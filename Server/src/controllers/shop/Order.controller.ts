import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";
import { createPayPalPayment, executePayPalPayment } from "../../services/paypal.service";
import paypal from "../../Helpers/paypal";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const {
            userId, cartId, cartItems, addressInfo, orderStatus, 
            paymentMethod, paymentStatus, totalAmount, orderDate, 
            orderUpdateDate, paymentId, payerId
        } = req.body;

        const paymentData = createPayPalPayment(cartItems, totalAmount);

        paypal.payment.create(paymentData, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error:", error);
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error while creating payment",
                });
            }

            const newlyCreatedOrder = await prisma.order.create({
                data: {
                    userId, cartId, cartItems, addressInfo, orderStatus,
                    paymentMethod, paymentStatus, totalAmount, orderDate,
                    orderUpdateDate, paymentId, payerId
                },
            });

            const approvalURL = paymentInfo.links?.find(link => link.rel === "approval_url")?.href;
            
            res.status(HttpCode.CREATED).json({
                success: true,
                message: "Payment Order Created Successfully",
                approvalURL,
                orderId: newlyCreatedOrder.id,
            });
        });
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};

export const capturePayment = async (req: Request, res: Response) => {
    try {
                // we nedd to get the payemtId,payerId and orderID
        const { paymentId, payerId,  } = req.body;

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }

        await executePayPalPayment(paymentId, payerId);

        // Delete the cart after successful payment
        await prisma.cart.delete({ where: { id: order.cartId } });

        // Update order status
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: "PAID", orderStatus: "APPROVED", paymentId, payerId },
        });
        for(const item of order.cartItems){
            const product = await prisma.product.findUnique({where:{id:item.productId}})
            if (!product) {
                return res.status(HttpCode.NOT_FOUND).json({
                    success:false,
                    message: `Not enough stock for ${product?.name}`
                })
            }

            await prisma.product.update({
                where:{id:item.productId},
                data:{
                    stock: product.stock -= item.quantity
                }
            })
            
        }
        res.status(HttpCode.OK).json({
            success: true,
            message: `Order ${updatedOrder.id} confirmed successfully`,
            data: updatedOrder,
        });
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};

export const getAllOrdersByUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;

        const orders = await prisma.order.findMany({where:{userId}});
        if (!orders) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "No Orders found",
            });
        }
        res.status(HttpCode.OK).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};

export const getOrderDetails = async (req: Request, res: Response) => {
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
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
