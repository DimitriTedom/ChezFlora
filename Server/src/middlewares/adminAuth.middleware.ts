// src/middlewares/adminAuth.ts
import { Request, Response, NextFunction } from "express";
import { HttpCode } from "../core/constants";
import { prisma } from "../controllers/auth.controller";

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id; // Assuming you have authentication middleware that sets req.user
    
    if (!userId) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return res.status(HttpCode.FORBIDDEN).json({
        success: false,
        message: "Admin privileges required"
      });
    }

    next();
  } catch (error) {
    console.error("[Admin Auth Error]", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Authorization check failed"
    });
  }
};