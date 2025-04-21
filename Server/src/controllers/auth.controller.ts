import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { HttpCode } from '../core/constants';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { errorHandler } from '../middlewares/auth.middleware';
import nodemailer from 'nodemailer';
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import path from 'path';
export const prisma = new PrismaClient();

export const initiateRegistration = async (req: Request, res: Response) => {
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

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		await prisma.pendingUser.create({
			data: {
				name,
				email,
				password: hashedPassword,
				otp,
				otpExpiresAt
			}
		});
		// Create the transporter
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		});

		// Configure the email template
		const handlebarOptions:NodemailerExpressHandlebarsOptions = {
			viewEngine: {
				extname: '.hbs',
				partialsDir: path.resolve(__dirname, 'templates'),
				defaultLayout: false
			},
			viewPath: path.resolve(__dirname, 'templates'),
			extName: '.hbs'
		};

		transporter.use('compile', hbs(handlebarOptions));

		const mailOptions = {
			from: '"ChezFlora" <noreply@chezflora.com>',
			to: email,
			subject: 'Your OTP Code',
			template: 'otp',
			context: {
				name: name,
				otp
			}
		};
		await transporter.sendMail(mailOptions);

		res.status(HttpCode.OK).json({
			success: true,
			message: 'OTP sent to your email. Please verify to complete registration.'
		});
	} catch (error) {
		errorHandler(error, res);
	}
};

export const completeRegistration = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Retrieve pending registration
    const pending = await prisma.pendingUser.findUnique({ where: { email } });
    if (!pending) {
      return res.status(HttpCode.NOT_FOUND).json({
        success: false,
        message: "Pending registration not found. Please initiate registration first."
      });
    }

    // Check OTP and expiration
    if (pending.otp !== otp) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid OTP code."
      });
    }
    if (pending.otpExpiresAt < new Date()) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        message: "OTP expired. Please re-initiate registration."
      });
    }

    // Create the user in the main User table
    await prisma.user.create({
      data: {
        name: pending.name,
        email: pending.email,
        password: pending.password,
        role: 'USER'
      }
    });

    // Remove the pending registration entry
    await prisma.pendingUser.delete({ where: { email } });

    res.status(HttpCode.OK).json({
      success: true,
      message: "Registration complete. Your account has been created."
    });
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while completing registration."
    });
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

		res.cookie('token', token, { httpOnly: true, secure: true, sameSite:'none' }).json({
			success: true,
			message: 'Logged in succesfully',
			user: {
				id: user.id,
				email: user.email,
				role: user.role.toUpperCase(),
				name: user.name,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		});
	} catch (error) {
		errorHandler(error, res);
	}
};
//controller to checkUser and send him otp
export const checkUser = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: "User doesn't exist! Please register first"
			});
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 fois 60 seconds fois 1000 pour miliseconds

		await prisma.user.update({
			where: { email },
			data: { otp, otpExpiresAt }
		});

		// Create the transporter
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		});

		// Setup Handlebars engine
		const handlebarOptions:NodemailerExpressHandlebarsOptions = {
			viewEngine: {
				extname: '.hbs',
				partialsDir: path.resolve(__dirname, 'templates'),
				defaultLayout: false
			},
			viewPath: path.resolve(__dirname, 'templates'),
			extName: '.hbs'
		};

		transporter.use('compile', hbs(handlebarOptions));

		// Send email using the template
		const mailOptions = {
			from: '"ChezFlora" <noreply@chezflora.com>',
			to: email,
			subject: 'Your OTP Code',
			template: 'otp',
			context: {
				name: user.name,
				otp
			}
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);

		res.status(HttpCode.OK).json({
			success: true,
			message: 'User found and OTP sent. Please verify the OTP.'
		});
	} catch (error) {
		console.error(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'An error occurred'
		});
	}
};

export const checkPendingUser = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await prisma.pendingUser.findUnique({ where: { email } });

		if (!user) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: "User doesn't exist! Please register first"
			});
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 fois 60 seconds fois 1000 pour miliseconds

		await prisma.pendingUser.update({
			where: { email },
			data: { otp, otpExpiresAt }
		});

		// Create the transporter
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		});

		// Setup Handlebars engine
		const handlebarOptions:NodemailerExpressHandlebarsOptions = {
			viewEngine: {
				extname: '.hbs',
				partialsDir: path.resolve(__dirname, 'templates'),
				defaultLayout: false
			},
			viewPath: path.resolve(__dirname, 'templates'),
			extName: '.hbs'
		};

		transporter.use('compile', hbs(handlebarOptions));

		// Send email using the template
		const mailOptions = {
			from: '"ChezFlora" <noreply@chezflora.com>',
			to: email,
			subject: 'Your OTP Code',
			template: 'otp',
			context: {
				name: user.name,
				otp
			}
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);

		res.status(HttpCode.OK).json({
			success: true,
			message: ' OTP Resent. Please verify the OTP.'
		});
	} catch (error) {
		console.error(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'An error occurred'
		});
	}
};
// Controller to update the user's password
export const updatePassword = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'User not found'
			});
		}
		const hashedPassword = await hashPassword(password);

		const updatedUser = await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword
			}
		});
		console.log(updatedUser);
		res.status(HttpCode.OK).json({
			success: true,
			message: 'Password updated successfully'
		});
	} catch (error) {
		console.error(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'An error occurred'
		});
	}
};
export const verifyOtp = async (req: Request, res: Response) => {
	try {
		const { email, otp } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'User not found. Please register first.'
			});
		}

		if (user.otp !== otp) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Invalid OTP code.'
			});
		}

		const now = new Date();
		if (!user.otpExpiresAt || user.otpExpiresAt < now) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'OTP expired. Please request a new one.'
			});
		}

		await prisma.user.update({
			where: { email },
			data: {
				otp: null,
				otpExpiresAt: null
			}
		});

		res.status(HttpCode.OK).json({
			success: true,
			message: 'OTP verified successfully.'
		});
	} catch (error) {
		console.error('Error verifying OTP:', error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'An error occurred while verifying OTP.'
		});
	}
};
export const logout = async (req: Request, res: Response) => {
	res.clearCookie('token').json({ success: true, message: 'Logged out successfully' });
};
