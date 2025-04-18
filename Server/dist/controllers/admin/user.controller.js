"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.updateUserRoles = exports.createUser = exports.getAllUsers = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const client_1 = require("@prisma/client"); // Import Prisma namespace for types
const auth_schema_1 = require("../../schemas/auth.schema");
const bcrypt_1 = require("../../utils/bcrypt");
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Filters definition
        // Use the imported Role enum and check if the value is valid
        const roleQuery = req.query.role;
        const role = roleQuery && Object.values(client_1.Role).includes(roleQuery) ? roleQuery : undefined;
        const search = req.query.search;
        // lets Build the where clause conditionally with a proper type
        const whereClause = {};
        if (role) {
            whereClause.role = role;
        }
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } }, // Corrected spelling
                { email: { contains: search, mode: 'insensitive' } } // Corrected spelling
            ];
        }
        const [users, totalUsers] = await Promise.all([
            auth_controller_1.prisma.user.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            orders: true,
                            quoteRequests: true
                        }
                    }
                }
            }),
            auth_controller_1.prisma.user.count({ where: whereClause })
        ]);
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
            meta: {
                totalUsers,
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit)
            }
        });
    }
    catch (error) {
        handleAdminError(res, error, 'Error fetching users');
    }
};
exports.getAllUsers = getAllUsers;
const handleAdminError = (res, error, defaultMsg) => {
    console.error('[Admin User Error]', error);
    if (error instanceof Error) {
        return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message.includes('prisma') ? 'Database operation failed' : error.message || defaultMsg
        });
    }
    res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: defaultMsg
    });
};
const createUser = async (req, res) => {
    try {
        const validateData = auth_schema_1.registerSchema.parse(req.body);
        const { name, email, password } = validateData;
        const existingUser = await auth_controller_1.prisma.user.findUnique({ where: { email } });
        const existingPending = await auth_controller_1.prisma.pendingUser.findUnique({ where: { email } });
        if (existingUser || existingPending) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Email already in use or pending verification'
            });
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        await auth_controller_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Registration complete. User created with success"
        });
    }
    catch (error) {
        handleAdminError(res, error, 'Failed to update user roles');
    }
};
exports.createUser = createUser;
const updateUserRoles = async (req, res) => {
    try {
        const { userIds, role } = req.body;
        console.log("users:", userIds, "role:", role);
        const adminId = req.user?.id;
        if (!userIds.length || !Object.values(client_1.Role).includes(role)) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Invalid request Body'
            });
        }
        //let's prevennt self-role modification
        if (userIds.includes(adminId)) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'You cannot update your own role'
            });
        }
        const result = await auth_controller_1.prisma.$transaction(async (tx) => {
            if (role === client_1.Role.USER) {
                const remainingAdmins = await tx.user.count({
                    where: {
                        id: { notIn: userIds },
                        role: client_1.Role.ADMIN
                    }
                });
                if (remainingAdmins < 1) {
                    throw new Error('System must have at least one admin');
                }
            }
            return tx.user.updateMany({
                where: { id: { in: userIds } },
                data: { role }
            });
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: `${result.count} users roles updated to ${role} successfully`
        });
    }
    catch (error) {
        handleAdminError(res, error, 'Failed to update user roles');
    }
};
exports.updateUserRoles = updateUserRoles;
const deleteUsers = async (req, res) => {
    try {
        const { userIds } = req.body;
        const adminId = req.user?.id;
        if (!userIds.length) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'No users specified for deletion'
            });
        }
        if (userIds.includes(adminId)) {
            return res.status(constants_1.HttpCode.FORBIDDEN).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }
        const result = await auth_controller_1.prisma.$transaction(async (tx) => {
            const deletingAdmins = await tx.user.count({
                where: {
                    id: { in: userIds },
                    role: client_1.Role.ADMIN
                }
            });
            if (deletingAdmins > 0) {
                const remainingAdmins = await tx.user.count({
                    where: {
                        id: { notIn: userIds },
                        role: client_1.Role.ADMIN
                    }
                });
                if (remainingAdmins < 1) {
                    return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                        success: false,
                        message: 'System must have at least one admin'
                    });
                }
            }
            // Ensure the updateMany operation is returned
            const updateResult = await tx.user.deleteMany({
                where: { id: { in: userIds } },
            });
            return updateResult; // Return the BatchPayload
        });
        // Check if the result is BatchPayload before accessing count
        if (result && typeof result === 'object' && 'count' in result) {
            res.status(constants_1.HttpCode.OK).json({
                success: true,
                message: `${result.count} users deleted successfully`
            });
        }
        else {
            // If result is not BatchPayload, it might be the Response from the early return
            // The response would have already been sent in that case, so maybe just log or do nothing.
            // Or handle the case where the transaction didn't return the expected payload.
            console.warn("Delete users transaction did not return expected BatchPayload.");
            // Avoid sending another response if one was already sent inside the transaction.
            if (!res.headersSent) {
                handleAdminError(res, new Error("Transaction completed unexpectedly"), 'Failed to delete users');
            }
        }
    }
    catch (error) {
        handleAdminError(res, error, 'Failed to update user roles');
    }
};
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=user.controller.js.map