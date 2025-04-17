"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactIssue = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const sendContactIssue = async (req, res) => {
    try {
        const { name, email, phone, address, subject, message } = req.body;
        if (!name || !email || !phone || !address || !subject || !message) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const existingUser = await auth_controller_1.prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Email does not have an account'
            });
        }
        const adminEmail = await auth_controller_1.prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (!adminEmail) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'No admin email found'
            });
        }
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
            from: '"ChezFlora Support" <support@chezflora.com>',
            to: adminEmail.email,
            subject: `New Contact: ${subject} (From: ${name})`,
            template: 'contact',
            context: { name, email, phone, address, subject, message }
        };
        await transporter.sendMail(mailOptions);
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'Your issue has been sent with success, you would be contacted soon'
        });
    }
    catch (error) {
        (0, auth_middleware_1.errorHandler)(error, res);
    }
};
exports.sendContactIssue = sendContactIssue;
//# sourceMappingURL=contact.controller.js.map