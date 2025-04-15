import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';
import { prisma } from '../auth.controller';
import { Prisma, Role } from '@prisma/client'; // Import Prisma namespace for types
import { registerSchema } from '../../schemas/auth.schema';
import { hashPassword } from '../../utils/bcrypt';
interface BulkOperation {
	userIds: string[];
}

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = (page - 1) * limit;

		// Filters definition
		// Use the imported Role enum and check if the value is valid
		const roleQuery = req.query.role as string | undefined;
		const role = roleQuery && Object.values(Role).includes(roleQuery as Role) ? (roleQuery as Role) : undefined;
		const search = req.query.search as string | undefined;

		// lets Build the where clause conditionally with a proper type
		const whereClause: Prisma.UserWhereInput = {}; 

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

export const createUser = async (req: Request, res: Response) => {
	try {
		const validateData = registerSchema.parse(req.body);
		const { name, email, password } = validateData;
		const existingUser = await prisma.user.findUnique({ where: { email } });
		const existingPending = await prisma.pendingUser.findUnique({ where: { email } });
		if (existingUser || existingPending) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Email already in use or pending verification'
			});
		}
				const hashedPassword = await hashPassword(password);
				await prisma.user.create({
					data: {
						name,
						email,
						password: hashedPassword,
					}
				});

				res.status(HttpCode.OK).json({
					success: true,
					message: "Registration complete. User created with success"
				  });
	} catch (error: unknown) {
		handleAdminError(res, error, 'Failed to update user roles');
	}
};


export const updateUserRoles = async (req: Request, res: Response) => {
	try {
		const { userIds, role }: RoleUpdate = req.body;
		console.log("users:",userIds , "role:", role);
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
			// Ensure the updateMany operation is returned
			const updateResult = await tx.user.deleteMany({ // Changed to deleteMany as per function name intent
				where: { id: { in: userIds } },
			});
			return updateResult; // Return the BatchPayload
		});

		// Check if the result is BatchPayload before accessing count
		if (result && typeof result === 'object' && 'count' in result) {
			res.status(HttpCode.OK).json({
				success: true,
				message: `${result.count} users deleted successfully`
			});
		} else {
			// If result is not BatchPayload, it might be the Response from the early return
			// The response would have already been sent in that case, so maybe just log or do nothing.
			// Or handle the case where the transaction didn't return the expected payload.
			console.warn("Delete users transaction did not return expected BatchPayload.");
			// Avoid sending another response if one was already sent inside the transaction.
			if (!res.headersSent) {
				handleAdminError(res, new Error("Transaction completed unexpectedly"), 'Failed to delete users');
			}
		}
	} catch (error: unknown) {
		handleAdminError(res, error, 'Failed to update user roles');
	}
};
