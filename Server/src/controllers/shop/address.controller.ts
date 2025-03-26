import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const addAdresss = async (req: Request, res: Response) => {
    try {
        const {userId,address,city,phone,postalCode,notes} = req.body
        if (!userId || !address || !city || !phone || !postalCode || !notes) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success:false,
                message:"Invalid data provided !"
            })
        }
        const newAddress = await prisma.address.create({
            data:{
                userId,
                address,
                phone,
                city,
                postalCode,
                notes,

            }
        });
        res.status(HttpCode.OK).json({
            success:true,
            data:newAddress
        })
    } catch (error: any) {
        console.log(error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};

export const fetchAllAdress = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        if (!userId) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success:false,
                message:"User id is required",
            });
        }
        const addressList = await prisma.address.findFirst({where:{userId}});
        res.status(HttpCode.OK).json({
            success:true,
            data:addressList,
        })
    } catch (error: any) {
        console.log(error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};
export const editAdresss = async (req: Request, res: Response) => {
    try {
        const {userId,addressId} = req.params
        const formData = req.body
        if (!userId || !addressId) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success:false,
                message:"User id and address id are required",
            });
        }

        const address = await prisma.address.update({
            where: {id:addressId, userId:userId},
            data:formData
        });

        if (!address) {
            return res.status(HttpCode.NOT_FOUND).json({
                success:false,
                message:'Address not found'
            })
        }

        res.status(HttpCode.OK).json({
            success:true,
            data:address
        })
    } catch (error: any) {
        console.log(error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};


export const deleteAdresss = async (req: Request, res: Response) => {
    try {
        const {userId,addressId} = req.params
        if (!userId || !addressId) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success:false,
                message:"User id and address id are required",
            });
        }
    const address = await prisma.address.delete({where: {id:addressId, userId: userId }})
    if (!address) {
        return res.status(HttpCode.NOT_FOUND).json({
            success:false,
            message:'Address not found'
        })
    }
    res.status(HttpCode.OK).json({
        success:false,
        message: "address deleted successfully"
    })
    } catch (error: any) {
        console.log(error);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};