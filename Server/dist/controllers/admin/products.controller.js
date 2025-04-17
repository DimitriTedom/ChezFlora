"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducts = exports.editProducts = exports.fetchAllProducts = exports.addProduct = exports.handleImageUpload = void 0;
const cloudinary_1 = require("../../Helpers/cloudinary");
const constants_1 = require("../../core/constants");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Aucun fichier téléchargé'
            });
        }
        const result = await (0, cloudinary_1.uploadToCloudinary)(req.file);
        res.status(200).json({
            success: true,
            message: 'Image uploaded with success',
            data: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });
    }
    catch (error) {
        console.error('Erreur upload:', error);
        res.status(500).json({
            success: false,
            message: "An Error Occured",
            error: error.message
        });
    }
};
exports.handleImageUpload = handleImageUpload;
//CREATE(ADD) PRODUCT
const addProduct = async (req, res) => {
    try {
        const { image, name, description, price, category, event, saleprice, stock } = req.body;
        const parsedPrice = parseFloat(price);
        const parsedSaleprice = parseFloat(saleprice);
        const parsedStock = parseInt(stock);
        if (isNaN(parsedPrice) || isNaN(parsedSaleprice) || isNaN(parsedStock)) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }
        const existingProduct = await prisma.product.findFirst({
            where: { name }
        });
        if (existingProduct) {
            return res.status(409).json({ success: false, message: 'Product already exists' });
        }
        const newProduct = await prisma.product.create({
            data: {
                name,
                image,
                description,
                price: parsedPrice,
                category,
                event,
                saleprice: parsedSaleprice,
                stock: parsedStock
            }
        });
        console.log(newProduct);
        res.status(constants_1.HttpCode.CREATED).json({
            success: true,
            data: newProduct
        });
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'Error occured'
        });
    }
};
exports.addProduct = addProduct;
//READ(FETCH) PRODUCTS
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await prisma.product.findMany({});
        res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: listOfProducts
        });
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'Error occured'
        });
    }
};
exports.fetchAllProducts = fetchAllProducts;
//EDIT PRODUCT
const editProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, name, description, price, category, event, saleprice, stock } = req.body;
        const findProduct = await prisma.product.findUnique({ where: { id } });
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        // Parsing des valeurs numériques
        const parsedPrice = price ? parseFloat(price) : findProduct.price;
        const parsedSaleprice = saleprice ? parseFloat(saleprice) : findProduct.saleprice;
        const parsedStock = stock ? parseInt(stock) : findProduct.stock;
        if ((price && isNaN(parsedPrice)) || (saleprice && isNaN(parsedSaleprice)) || (stock && isNaN(parsedStock))) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: name || findProduct.name,
                description: description || findProduct.description,
                price: parsedPrice,
                category: category || findProduct.category,
                event: event || findProduct.event,
                saleprice: parsedSaleprice,
                stock: parsedStock,
                image: image || findProduct.image
            }
        });
        console.log(updatedProduct, "updated product"),
            res.status(200).json({
                success: true,
                message: `${findProduct.name} updated successfully`,
                data: updatedProduct
            });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
exports.editProducts = editProducts;
//DELETE PRODUCT
const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        await prisma.product.delete({ where: { id } });
        res.status(200).json({
            success: true,
            message: `${product.name} deleted successfully`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
exports.deleteProducts = deleteProducts;
//# sourceMappingURL=products.controller.js.map