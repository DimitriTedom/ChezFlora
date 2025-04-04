import { z } from "zod";
import { HttpCode } from "../core/constants";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required'
    });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) throw new Error('Invalid token');
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name
    };
    
    next();
  } catch (error) {
    res.status(HttpCode.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};


export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(HttpCode.FORBIDDEN).json({
      success: false,
      message: 'Admin privileges required'
    });
  }
  next();
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