import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";
import { QuoteStatus,EventType } from "@prisma/client";

interface quoteRequestInput{
    userId: string;
    eventDate: Date | string;
    eventType: EventType;
    estimatedBudget: string;
    description: string;
}
export const addQuoteRequest = async (req: Request, res: Response) => {
    try {
        const {userId,eventDate,eventType,estimatedBudget,description}:quoteRequestInput = req.body;
        if (!userId || !eventDate || !eventType || !description || !estimatedBudget || estimatedBudget <= 0) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message:  "All fields (userId, eventDate, eventType, description,estimatedBudget) are required",
            });
        }
        const parsedEstimatedBudget = parseFloat(estimatedBudget);
        if (!Object.values(EventType).includes(eventType)) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid event type provided!",
            });
            
        }
       const userExists = await prisma.user.findUnique({where:{id:userId}});
        if(!userExists){
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "User not found!",
            });
        }

        const parsedEventDate = new Date(eventDate);
        if (isNaN(parsedEventDate.getTime())) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid event date format",
            });
        }
        if (parsedEventDate < new Date()) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Event date must be in the future",
            });
        }

         await prisma.quoteRequest.create({
            data:{
                userId,
                eventDate:parsedEventDate,
                estimatedBudget:parsedEstimatedBudget,
                eventType,
                description,
                status:QuoteStatus.PENDING,
            }
        })
        res.status(HttpCode.CREATED).json({
            success: true,
            message: "Quote request created successfully!",
        })
        
    } catch (error: unknown) {
        console.error("Error creating quote request:", error);
        if (error instanceof Error && error.message.includes("prisma")) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Database error Occured",
            });
        }
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};

export const fetchAllQuoteRequests = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(HttpCode.BAD_REQUEST).json({
          success: false,
          message: "User id is required",
        });
      }
  
        const quoteRequests = await prisma.quoteRequest.findMany({
            where: { userId },
        });
        res.status(HttpCode.OK).json({
            success: true,
            message:"Quote requests fetched successfully",
            data: quoteRequests,
        });
    } catch (error: any) {
        console.error("Error creating quote request:", error);
        if (error instanceof Error && error.message.includes("prisma")) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Database error Occured",
            });
        }
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
  };
  
  export const getQuoteRequestDetail = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const quote = await prisma.quoteRequest.findUnique({where:{id}});
        if (!quote) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: "Quote Request not found",
            });
        }
        res.status(HttpCode.OK).json({
            success: true,
            message: "Quote fetched successfully",
            data: quote,
        });
    } catch (error: unknown) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};