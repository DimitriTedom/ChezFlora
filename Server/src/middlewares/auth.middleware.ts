import { z } from "zod";
import { HttpCode } from "../core/constants";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    // Vérifier d'abord le header Authorization
    let token =  req.cookies?.token;
  
    // Si non trouvé, vérifier les cookies
    if (!token) {
      token = req.cookies.token;
    }
  
    if (!token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        success: false,
        message: 'Token missing!',
      });
    }
  
    try {
      const decoded = verifyToken(token);
      if (!decoded) throw new Error('Invalid token');
      
      (req as any).user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name
      };
      next();
    } catch (error) {
      res.status(HttpCode.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token!',
      });
    }
  };
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