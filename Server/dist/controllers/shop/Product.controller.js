"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductDetails = exports.getFiltereProducts = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
const getFiltereProducts = async (req, res) => {
    try {
        const { category = '', event = '', sortBy = 'price-lowtohigh' } = req.query;
        const categoryArray = category.toString().split(',').filter(Boolean);
        const eventArray = event.toString().split(',').filter(Boolean);
        const filters = {};
        if (categoryArray.length) {
            filters.category = { in: categoryArray };
        }
        if (eventArray.length) {
            filters.event = { in: eventArray };
        }
        const sortMap = {
            'price-lowtohigh': { price: 'asc' },
            'price-hightolow': { price: 'desc' },
            'title-atoz': { name: 'asc' },
            'title-ztoa': { name: 'desc' }
        };
        const sortKey = sortBy.toString();
        const products = await auth_controller_1.prisma.product.findMany({
            where: filters,
            orderBy: sortMap[sortKey] || { name: 'asc' }
        });
        res.status(constants_1.HttpCode.OK).json({ success: true, data: products });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching products' });
    }
};
exports.getFiltereProducts = getFiltereProducts;
const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await auth_controller_1.prisma.product.findUnique({ where: { id } });
        if (!product) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Product not found!'
            });
        }
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: "Product found !",
            data: product
        });
    }
    catch (error) {
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching products' });
    }
};
exports.getProductDetails = getProductDetails;
//# sourceMappingURL=Product.controller.js.map