import nodemailer from 'nodemailer';
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import path from 'path';
import { HttpCode } from "../../core/constants";
import { Request, Response } from "express";
import { prisma } from "../auth.controller";
import { errorHandler } from '../../middlewares/auth.middleware';
import { contactSchema } from '../../schemas/auth.schema';

// Enhanced input sanitization
const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '').substring(0, 1000);
};

export const sendContactIssue = async (req: Request, res: Response) => {
    try {
        // Validate input using Zod schema
        const validatedData = contactSchema.parse(req.body);
        const { name, email, phone, address, subject, message } = validatedData;

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            address: address ? sanitizeInput(address) : '',
            subject: sanitizeInput(subject),
            message: sanitizeInput(message)
        };

        // Find admin email for notification
        const adminUser = await prisma.user.findFirst({ 
            where: { role: 'ADMIN' },
            select: { email: true }
        });

        if (!adminUser) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Unable to process contact request at this time'
            });
        }

        // Send notification email to admin
        await sendContactNotificationEmail(sanitizedData, adminUser.email);

        // Send confirmation email to user
        await sendContactConfirmationEmail(sanitizedData);

        res.status(HttpCode.OK).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        errorHandler(error, res);
    }
};

// Enhanced email sending with better error handling
const sendContactNotificationEmail = async (data: any, adminEmail: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        pool: true,
        maxConnections: 5,
    });

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
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
        from: '"ChezFlora Contact Form" <noreply@chezflora.com>',
        to: adminEmail,
        subject: `New Contact Form Submission: ${data.subject}`,
        template: 'contact',
        context: {
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: data.phone,
            customerAddress: data.address,
            subject: data.subject,
            message: data.message,
            submissionDate: new Date().toLocaleString()
        }
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Contact notification sent to admin: ${adminEmail}`);
    } catch (error) {
        console.error('Failed to send contact notification email:', error);
        throw new Error('Failed to send notification email');
    }
};

const sendContactConfirmationEmail = async (data: any) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: '"ChezFlora Support" <support@chezflora.com>',
        to: data.email,
        subject: 'Thank you for contacting ChezFlora',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #8CAF93;">Thank you for contacting ChezFlora!</h2>
                <p>Dear ${data.name},</p>
                <p>We have received your message regarding: <strong>${data.subject}</strong></p>
                <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #8CAF93;">
                    <strong>Your Message:</strong><br>
                    ${data.message}
                </div>
                <p>Best regards,<br>The ChezFlora Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Contact confirmation sent to: ${data.email}`);
    } catch (error) {
        console.error('Failed to send contact confirmation email:', error);
        // Don't throw error here as the main functionality (admin notification) succeeded
    }
};
