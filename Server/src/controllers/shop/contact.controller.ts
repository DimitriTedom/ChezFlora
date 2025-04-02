import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";
import { errorHandler } from '../../middlewares/auth.middleware';

export const sendContactIssue = async (req: Request, res: Response) => {
    try {
        const { name, email, phone,address,subject,message } = req.body;
        if (!name || !email || !phone || !address || !subject || !message) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'All fields are required'
            });
            
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            return res.status(HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Email does not have an account'
            });
        }

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
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.resolve(__dirname, 'templates'),
                defaultLayout: false
            },
            viewPath: path.resolve(__dirname, 'templates'),
            extName: '.hbs'
        };

        transporter.use('compile', hbs(handlebarOptions));

        const mailOptions = {
            from: '"ChezFlora Support" <support@chezflora.com>',
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact: ${subject} (From: ${name})`,
            template: 'contact',
            context: { name, email, phone, address, subject, message }
        };
        await transporter.sendMail(mailOptions);

        res.status(HttpCode.OK).json({
            success: true,
            message: 'Your issue has been sent with success, you would be contacted soon'
        });
    } catch (error) {
        errorHandler(error, res);
    }
};
