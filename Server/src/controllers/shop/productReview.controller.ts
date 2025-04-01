import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";


export const addProductReview = async (req: Request, res: Response) => {
    try {
        const {productId,userId,content,rating,userName} = req.body;
        if (!productId || !userId || !content || !rating || rating<1 || rating >5 || !userName) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
       const order = await prisma.order.findFirst({where:{userId,cartItems:{some:{productId}},paymentStatus:"PAID"}});
         if(!order){
            return res.status(HttpCode.FORBIDDEN).json({
                success: false,
                message: "You can't review a product you didn't buy!",
            });
         }
         const checkExistingReview = await prisma.productReview.findFirst({where:{productId,userId}});
            if(checkExistingReview){
                return res.status(HttpCode.FORBIDDEN).json({
                    success: false,
                    message: "You already reviewed this product!",
                });
            }
        const newReview = await prisma.productReview.create({
            data:{
                productId,
                userId,
                content,
                rating,
                userName
            }
        })
        const reviews = await prisma.productReview.findMany({where:{productId}});
        const totalReviewLength = reviews.length;
        const averageReview = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviewLength;
        await prisma.product.update({
            where:{id:productId},
            data:{
                averageReview,
            }
        })
        res.status(HttpCode.CREATED).json({
            success: true,
            message: "Product review added successfully!",
            data: newReview,
        });
        
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};


export const getProductReview = async (req: Request, res: Response) => {
    try {
        const {productId} = req.params;
        const reviews = await prisma.productReview.findMany({where:{productId}});
        if (!reviews) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "No Reviews found",
            });
        }
        res.status(HttpCode.OK).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};