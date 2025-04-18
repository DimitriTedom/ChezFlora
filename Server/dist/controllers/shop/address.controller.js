"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdresss = exports.editAdresss = exports.fetchAllAdress = exports.addAdresss = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
// Create a new address
const addAdresss = async (req, res) => {
    try {
        const { userId, address, city, phone, postalCode, notes } = req.body;
        if (!userId || !address || !city || !phone || !postalCode || !notes) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const newAddress = await auth_controller_1.prisma.address.create({
            data: {
                userId,
                address,
                phone,
                city,
                postalCode,
                notes,
            },
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: newAddress,
        });
    }
    catch (error) {
        console.error("Error adding address:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.addAdresss = addAdresss;
// Fetch address(es) for a user
const fetchAllAdress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "User id is required",
            });
        }
        const addressList = await auth_controller_1.prisma.address.findMany({ where: { userId } });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: addressList,
        });
    }
    catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.fetchAllAdress = fetchAllAdress;
// Edit an existing address
const editAdresss = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        if (!userId || !addressId) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "User id and address id are required",
            });
        }
        const existingAddress = await auth_controller_1.prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!existingAddress) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Address not found",
            });
        }
        const updatedAddress = await auth_controller_1.prisma.address.update({
            where: { id: addressId },
            data: formData,
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: updatedAddress,
        });
    }
    catch (error) {
        console.error("Error updating address:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.editAdresss = editAdresss;
// Delete an address
const deleteAdresss = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "User id and address id are required",
            });
        }
        const existingAddress = await auth_controller_1.prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!existingAddress) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Address not found",
            });
        }
        await auth_controller_1.prisma.address.delete({ where: { id: addressId } });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Address deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting address:", error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.deleteAdresss = deleteAdresss;
//# sourceMappingURL=address.controller.js.map