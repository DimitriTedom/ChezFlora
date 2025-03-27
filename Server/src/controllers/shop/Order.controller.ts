import { PrismaClient } from "@prisma/client";
import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import paypal from '../../Helpers/paypal'
const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
    try {
        const {userId,cartId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId} = req.body;

        //create payement json for paypal instance

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls:{
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url:'http://localhost:5173/shop/paypal-cancel'
            },
            transactions:[
                {
                    item_list:{
                        items:cartItems.map(item=>({
                            name:item.title,
                            sku:item.productId,
                            price:item.price.toFixed(2),
                            currency:'USD',
                            quantity:item.quantity
                        }))
                    },
                    amount:{
                        currency:'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description:'description'
                }
            ]
        }
        paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
            if (error) {
                console.log(error)
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                    success:false,
                    message:"Error while creating payment"
                })
            }else{
                const newlyCreatedOrder = await prisma.order.create({
                    data:{
                        userId,
                        cartId,
                        cartItems,
                        addressInfo,
                        orderStatus,
                        paymentMethod,
                        paymentStatus,
                        totalAmount,
                        orderDate,
                        orderUpdateDate,
                        paymentId,
                        payerId
                    }
                })
                const approvalURL = paymentInfo.links?.find(link=>link.rel === 'approval_url')?.href;
                res.status(HttpCode.CREATED).json({
                    success:true,
                    message:"Payment Order Created Successfully",
                    approvalURL,
                    orderId:newlyCreatedOrder.id
                })
            }
        })
    } catch (error: any) {
      console.error("Error adding address:", error);
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  };

  //This capture payement will help me verify is the payement is well correctly done
  export const capturePayment = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
      console.error("Error adding address:", error);
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  };