import { PrismaClient } from "@prisma/client";
import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a new address
export const addAdresss = async (req: Request, res: Response) => {
  try {
    const { userId, address, city, phone, postalCode, notes } = req.body;

    if (!userId || !address || !city || !phone || !postalCode || !notes) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const newAddress = await prisma.address.create({
      data: {
        userId,
        address,
        phone,
        city,
        postalCode,
        notes,
      },
    });
    res.status(HttpCode.OK).json({
      success: true,
      data: newAddress,
    });
  } catch (error: any) {
    console.error("Error adding address:", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Fetch address(es) for a user
export const fetchAllAdress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "User id is required",
      });
    }


    const addressList = await prisma.address.findMany({ where: { userId } });
    res.status(HttpCode.OK).json({
      success: true,
      data: addressList,
    });
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Edit an existing address
export const editAdresss = async (req: Request, res: Response) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "User id and address id are required",
      });
    }


    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });
    if (!existingAddress) {
      return res.status(HttpCode.NOT_FOUND).json({
        success: false,
        message: "Address not found",
      });
    }


    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: formData,
    });
    res.status(HttpCode.OK).json({
      success: true,
      data: updatedAddress,
    });
  } catch (error: any) {
    console.error("Error updating address:", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};

// Delete an address
export const deleteAdresss = async (req: Request, res: Response) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "User id and address id are required",
      });
    }


    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });
    if (!existingAddress) {
      return res.status(HttpCode.NOT_FOUND).json({
        success: false,
        message: "Address not found",
      });
    }


    await prisma.address.delete({ where: { id: addressId } });
    res.status(HttpCode.OK).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};
