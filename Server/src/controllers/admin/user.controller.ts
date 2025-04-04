import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';
import { prisma } from '../auth.controller';
import { Role } from '@prisma/client';
interface BulkOperation {
	userIds: string[];
}

interface RoleUpdate extends BulkOperation {
	role: Role;
}

const handleAdminError = (res: Response, error: unknown, defaultMsg: string) => {
	console.error('[Admin User Error]', error);

	if (error instanceof Error) {
		return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: error.message.includes('prisma') ? 'Database operation failed' : error.message || defaultMsg
		});
	}

	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
		success: false,
		message: defaultMsg
	});
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = (page - 1) * limit;

		//Filters definition
		const role = req.query.role as Role | undefined;
		const search = req.query.search as string | undefined;

		const whereClause = {
			...(role && { role }),
			...(search && {
				OR: [{ name: { contains: search, mode: insensitive } }, { email: { contains: search, mode:insensitive } }]
			})
		};
		const [users, totalUsers] = await Promise.all([
			prisma.user.findMany({
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
			prisma.user.count({ where: whereClause })
		]);

		res.status(HttpCode.OK).json({
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
	} catch (error: unknown) {
		handleAdminError(res, error, 'Error fetching users');
	}
};

export const updateUserRoles = async (req: Request, res: Response) => {
	try {
		const { userIds, role }: RoleUpdate = req.body;
		const adminId = req.user?.id;
		if (!userIds.length || !Object.values(Role).includes(role)) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Invalid request Body'
			});
		}
		//let's prevennt self-role modification
		if (userIds.includes(adminId as string)) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'You cannot update your own role'
			});
		}
		const result = await prisma.$transaction(async (tx) => {
			if (role === Role.USER) {
				const remainingAdmins = await tx.user.count({
					where: {
						id: { notIn: userIds },
						role: Role.ADMIN
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
		res.status(HttpCode.OK).json({
			success: true,
			message: `${result.count} users roles updated to ${role} successfully`
		});
	} catch (error: unknown) {
		handleAdminError(res, error, 'Failed to update user roles');
	}
};

export const deleteUsers = async (req: Request, res: Response) => {
	try {
		const { userIds }: BulkOperation = req.body;
		const adminId = req.user?.id;
		if (!userIds.length) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'No users specified for deletion'
			});
		}
		if (userIds.includes(adminId as string)) {
			return res.status(HttpCode.FORBIDDEN).json({
				success: false,
				message: 'You cannot delete your own account'
			});
		}
		const result = await prisma.$transaction(async (tx) => {
			const deletingAdmins = await tx.user.count({
				where: {
					id: { in: userIds },
					role: Role.ADMIN
				}
			});
			if (deletingAdmins > 0) {
				const remainingAdmins = await tx.user.count({
					where: {
						id: { notIn: userIds },
						role: Role.ADMIN
					}
				});
				if (remainingAdmins < 1) {
					return res.status(HttpCode.BAD_REQUEST).json({
						success: false,
						message: 'System must have at least one admin'
					});
				}
			}
			return tx.user.updateMany({
				where: { id: { in: userIds } },
				data: { updatedAt: new Date() }
			});
		});
		res.status(HttpCode.OK).json({
			success: true,
			message: `${result.count} users deleted successfully`
		});
	} catch (error: unknown) {
		handleAdminError(res, error, 'Failed to update user roles');
	}
};
