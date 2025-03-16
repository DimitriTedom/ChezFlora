import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { HttpCode } from '../core/constants';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { z } from 'zod';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
	try {
		// Lets validate data with zod here:
		const validateData = registerSchema.parse(req.body);
		const { name, email, password } = validateData;
		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return res.status(HttpCode.BAD_REQUEST).json({ error: 'Email already used' });
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
// Noramalement, je veut que l'utilisateur apres avoir ete enregistrer, doit login pour s'authentifier avant de recevoir un token via api/auth/login
// Donc la logique suivante est a reflechir
		// const token = generateToken(user.id, user.email, user.role, user.name);
			console.log(user)
		res.status(HttpCode.OK).json({ success: true, message: 'Registration successful' });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				errors: error.errors // Here we return the validation erros of Zod
			});
		}
		console.error(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal server error occurred'
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const validatedData = loginSchema.parse(req.body);
		const { email, password } = validatedData;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(HttpCode.UNAUTHORIZED).json({ error: "User doesn't exist ! pleaseregister first" });
		}

		const isValid = await comparePassword(password, user.password);
		if (!isValid) {
			return res.status(HttpCode.UNAUTHORIZED).json({ error: 'Incorrect email or password' });
		}

		const token = generateToken(user.id, user.email, user.role, user.name);

		res.cookie('token', token, { httpOnly: true, secure: false }).json({
			success: true,
			message: 'Logged in succesfully',
			user: {
				email: user.email,
				role: user.role,
				id: user.id,
				userName: user.name
			} 
		});
		res.status(HttpCode.OK).json({ success: true, message: 'Login successful',
			user: {
				email: user.email,
				role: user.role,
				id: user.id,
				userName: user.name
			}
		 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				errors: error.errors
			});
		}
		console.error(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Internal server error occurred'
		});
	}
};
