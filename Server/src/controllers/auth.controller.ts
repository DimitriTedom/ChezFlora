import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { HttpCode } from '../core/constants';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { errorHandler } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	try {
		// Lets validate data with zod here:
		const validateData = registerSchema.parse(req.body);
		const { name, email, password } = validateData;
		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return res.status(HttpCode.BAD_REQUEST).json({ success: false, message: 'Email already used' });
		}

		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: 'USER'
			}
		});

		console.log(user);
		res.status(HttpCode.OK).json({ success: true, message: 'Registration successful' });
	} catch (error) {
		errorHandler(error, res);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const validatedData = loginSchema.parse(req.body);
		const { email, password } = validatedData;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res
				.status(HttpCode.UNAUTHORIZED)
				.json({ success: false, message: "User doesn't exist ! please register first" });
		}

		const isValid = await comparePassword(password, user.password);
		if (!isValid) {
			return res.status(HttpCode.UNAUTHORIZED).json({ success: false, message: 'Incorrect email or password' });
		}

		const token = generateToken(user.id, user.email, user.role, user.name);

		res.cookie('token', token, { httpOnly: true, secure: false }).json({
			success: true,
			message: 'Logged in succesfully',
			user: {
				id: user.id,
				email: user.email,
				role: user.role.toUpperCase(),
				name: user.name
			}
		});
		//Note : en allant en production, on va securiser le token avec  le code suivant:
		// 		const isProduction = process.env.NODE_ENV === 'production';
		// res.cookie('token', token, {
		//   httpOnly: true,
		//   secure: isProduction,
		//   sameSite: 'strict'
		// });

		// res.status(HttpCode.OK).json({
		// 	success: true,
		// 	message: 'Login successful',
		// 	data: {
		// 	  user: {
		// 		id: user.id,
		// 		email: user.email,
		// 		role: user.role,
		// 		name: user.name,
		// 	  },
		// 	},
		//   });
	} catch (error) {
		errorHandler(error, res);
	}
};

//auth middleware to verify controller when users will refresh page

// export const authMiddleware = async (req:Request,res:Response, next:NextFunction) =>{
// 	const token = req.cookies.token;
// 	if(!token) return res.status(HttpCode.UNAUTHORIZED).json({
// 		success:false,
// 		message:'Unauthorised user!'
// 	})

// 	try {
// 			const decoded = verifyToken(token);
// 			(req as any).user = decoded;
// 			next();
// 	} catch (error) {
// 		res.status(HttpCode.UNAUTHORIZED).json({
// 			success:false,
// 			message:'Unauthorised user!'
// 		})
// 	}

// }

// logouit controller :

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('token').json({ success: true, message: 'Logged out successfully' });
};
