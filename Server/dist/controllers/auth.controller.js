"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyOtp = exports.updatePassword = exports.checkPendingUser = exports.checkUser = exports.login = exports.completeRegistration = exports.initiateRegistration = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../core/constants");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
exports.prisma = new client_1.PrismaClient();
const initiateRegistration = async (req, res) => {
    try {
        const validateData = auth_schema_1.registerSchema.parse(req.body);
        const { name, email, password } = validateData;
        const existingUser = await exports.prisma.user.findUnique({ where: { email } });
        const existingPending = await exports.prisma.pendingUser.findUnique({ where: { email } });
        if (existingUser || existingPending) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Email already in use or pending verification'
            });
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await exports.prisma.pendingUser.create({
            data: {
                name,
                email,
                password: hashedPassword,
                otp,
                otpExpiresAt
            }
        });
        // Create the transporter
        const transporter = nodemailer_1.default.createTransport({
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
                partialsDir: path_1.default.resolve(__dirname, 'templates'),
                defaultLayout: false
            },
            viewPath: path_1.default.resolve(__dirname, 'templates'),
            extName: '.hbs'
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
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
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'OTP sent to your email. Please verify to complete registration.'
        });
    }
    catch (error) {
        (0, auth_middleware_1.errorHandler)(error, res);
    }
};
exports.initiateRegistration = initiateRegistration;
const completeRegistration = async (req, res) => {
    try {
        const { email, otp } = req.body;
        // Retrieve pending registration
        const pending = await exports.prisma.pendingUser.findUnique({ where: { email } });
        if (!pending) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Pending registration not found. Please initiate registration first."
            });
        }
        // Check OTP and expiration
        if (pending.otp !== otp) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid OTP code."
            });
        }
        if (pending.otpExpiresAt < new Date()) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "OTP expired. Please re-initiate registration."
            });
        }
        // Create the user in the main User table
        await exports.prisma.user.create({
            data: {
                name: pending.name,
                email: pending.email,
                password: pending.password,
                role: 'USER'
            }
        });
        // Remove the pending registration entry
        await exports.prisma.pendingUser.delete({ where: { email } });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Registration complete. Your account has been created."
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred while completing registration."
        });
    }
};
exports.completeRegistration = completeRegistration;
const login = async (req, res) => {
    try {
        const validatedData = auth_schema_1.loginSchema.parse(req.body);
        const { email, password } = validatedData;
        const user = await exports.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res
                .status(constants_1.HttpCode.UNAUTHORIZED)
                .json({ success: false, message: "User doesn't exist ! please register first" });
        }
        const isValid = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isValid) {
            return res.status(constants_1.HttpCode.UNAUTHORIZED).json({ success: false, message: 'Incorrect email or password' });
        }
        const token = (0, jwt_1.generateToken)(user.id, user.email, user.role, user.name);
        res.cookie('token', token, { httpOnly: true, secure: false }).json({
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
    }
    catch (error) {
        (0, auth_middleware_1.errorHandler)(error, res);
    }
};
exports.login = login;
//controller to checkUser and send him otp
const checkUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await exports.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "User doesn't exist! Please register first"
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 fois 60 seconds fois 1000 pour miliseconds
        await exports.prisma.user.update({
            where: { email },
            data: { otp, otpExpiresAt }
        });
        // Create the transporter
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        // Setup Handlebars engine
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path_1.default.resolve(__dirname, 'templates'),
                defaultLayout: false
            },
            viewPath: path_1.default.resolve(__dirname, 'templates'),
            extName: '.hbs'
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
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
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'User found and OTP sent. Please verify the OTP.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
exports.checkUser = checkUser;
const checkPendingUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await exports.prisma.pendingUser.findUnique({ where: { email } });
        if (!user) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "User doesn't exist! Please register first"
            });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 fois 60 seconds fois 1000 pour miliseconds
        await exports.prisma.pendingUser.update({
            where: { email },
            data: { otp, otpExpiresAt }
        });
        // Create the transporter
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        // Setup Handlebars engine
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path_1.default.resolve(__dirname, 'templates'),
                defaultLayout: false
            },
            viewPath: path_1.default.resolve(__dirname, 'templates'),
            extName: '.hbs'
        };
        transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
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
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: ' OTP Resent. Please verify the OTP.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
exports.checkPendingUser = checkPendingUser;
// Controller to update the user's password
const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await exports.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'User not found'
            });
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const updatedUser = await exports.prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword
            }
        });
        console.log(updatedUser);
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
exports.updatePassword = updatePassword;
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await exports.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'User not found. Please register first.'
            });
        }
        if (user.otp !== otp) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Invalid OTP code.'
            });
        }
        const now = new Date();
        if (!user.otpExpiresAt || user.otpExpiresAt < now) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'OTP expired. Please request a new one.'
            });
        }
        await exports.prisma.user.update({
            where: { email },
            data: {
                otp: null,
                otpExpiresAt: null
            }
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'OTP verified successfully.'
        });
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'An error occurred while verifying OTP.'
        });
    }
};
exports.verifyOtp = verifyOtp;
const logout = async (req, res) => {
    res.clearCookie('token').json({ success: true, message: 'Logged out successfully' });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map