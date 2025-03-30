import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";
import { Prisma, Category, EventType } from '@prisma/client';

export const SearchProducts = async (req: Request, res: Response) => {
    try {
        const { keyword } = req.params;

        if (!keyword || typeof keyword !== 'string') {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Keyword is required and must be a string.'
            });
        }

        // Convert keyword to match enum values
        const matchedCategory = Object.values(Category).find(cat => cat.toLowerCase() === keyword.toLowerCase());
        const matchedEvent = Object.values(EventType).find(event => event.toLowerCase() === keyword.toLowerCase());

        // Prisma search conditions
        const whereClause: Prisma.ProductWhereInput = {
            OR: [
                { name: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
                ...(matchedCategory ? [{ category: matchedCategory }] : []),
                ...(matchedEvent ? [{ event: matchedEvent }] : [])
            ],
        };

        const searchResults = await prisma.product.findMany({ where: whereClause });

        return res.status(HttpCode.OK).json({
            success: true,
            data: searchResults
        });

    } catch (error: unknown) {
        console.error("Error while searching products", error);
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR"
        });
    }
};
