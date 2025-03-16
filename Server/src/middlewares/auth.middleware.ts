import { z } from "zod";
import { HttpCode } from "../core/constants";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export const authenticateUser = (req: Request, res:Response, next:NextFunction)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) return res.status(HttpCode.UNAUTHORIZED).json({error: 'No token available'});

    const decoded = verifyToken(token);
    if(!decoded) return res.status(HttpCode.UNAUTHORIZED).json({error: 'invalid Token'});

    (req as any).user = decoded;
    next();
}

export const errorHandler = (error: any, res: Response) => {
        if (error instanceof z.ZodError) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors.map((err) => err.message)
            });
        }
        console.error(error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error occurred'
        });  };