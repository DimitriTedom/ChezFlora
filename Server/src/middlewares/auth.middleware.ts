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