"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProducts = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const client_1 = require("@prisma/client");
const SearchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== 'string') {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Keyword is required and must be a string.'
            });
        }
        // Convert keyword to match enum values
        const matchedCategory = Object.values(client_1.Category).find(cat => cat.toLowerCase() === keyword.toLowerCase());
        const matchedEvent = Object.values(client_1.EventType).find(event => event.toLowerCase() === keyword.toLowerCase());
        // Prisma search conditions
        const whereClause = {
            OR: [
                { name: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
                ...(matchedCategory ? [{ category: matchedCategory }] : []),
                ...(matchedEvent ? [{ event: matchedEvent }] : [])
            ],
        };
        const searchResults = await auth_controller_1.prisma.product.findMany({ where: whereClause });
        return res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: searchResults
        });
    }
    catch (error) {
        console.error("Error while searching products", error);
        return res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR"
        });
    }
};
exports.SearchProducts = SearchProducts;
//# sourceMappingURL=Search.controller.js.map