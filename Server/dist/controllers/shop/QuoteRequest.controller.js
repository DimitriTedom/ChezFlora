"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuoteRequestDetail = exports.fetchAllQuoteRequests = exports.addQuoteRequest = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const client_1 = require("@prisma/client");
const addQuoteRequest = async (req, res) => {
    try {
        const { userId, eventDate, eventType, estimatedBudget, description } = req.body;
        if (!userId || !eventDate || !eventType || !description || !estimatedBudget) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "All fields (userId, eventDate, eventType, description,estimatedBudget) are required",
            });
        }
        const parsedEstimatedBudget = parseFloat(estimatedBudget);
        if (parsedEstimatedBudget <= 0) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Estimated budget can't be less than or equal to zero",
            });
        }
        if (!Object.values(client_1.EventType).includes(eventType)) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid event type provided!",
            });
        }
        const userExists = await auth_controller_1.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "User not found!",
            });
        }
        const parsedEventDate = new Date(eventDate);
        if (isNaN(parsedEventDate.getTime())) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid event date format",
            });
        }
        if (parsedEventDate < new Date()) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "Event date must be in the future",
            });
        }
        await auth_controller_1.prisma.quoteRequest.create({
            data: {
                userId,
                eventDate: parsedEventDate,
                estimatedBudget: parsedEstimatedBudget,
                eventType,
                description,
                status: client_1.QuoteStatus.PENDING,
            }
        });
        res.status(constants_1.HttpCode.CREATED).json({
            success: true,
            message: "Quote request created successfully!",
        });
    }
    catch (error) {
        console.error("Error creating quote request:", error);
        if (error instanceof Error && error.message.includes("prisma")) {
            return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Database error Occured",
            });
        }
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.addQuoteRequest = addQuoteRequest;
const fetchAllQuoteRequests = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: "User id is required",
            });
        }
        const quoteRequests = await auth_controller_1.prisma.quoteRequest.findMany({
            where: { userId },
        });
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Quote requests fetched successfully",
            data: quoteRequests,
        });
    }
    catch (error) {
        console.error("Error creating quote request:", error);
        if (error instanceof Error && error.message.includes("prisma")) {
            return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Database error Occured",
            });
        }
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.fetchAllQuoteRequests = fetchAllQuoteRequests;
const getQuoteRequestDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await auth_controller_1.prisma.quoteRequest.findUnique({ where: { id } });
        if (!quote) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: "Quote Request not found",
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Quote fetched successfully",
            data: quote,
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
        });
    }
};
exports.getQuoteRequestDetail = getQuoteRequestDetail;
//# sourceMappingURL=QuoteRequest.controller.js.map