"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartITems = exports.updateCartIemQty = exports.fetchCartItems = exports.addToCart = void 0;
const constants_1 = require("../../core/constants");
const auth_controller_1 = require("../auth.controller");
//Add to cart. this is thelogic i propose :
//1 Find or create a cart for the user.
//2 Check if the product exists before adding it.
//3 Update quantity if the product is already in the cart.
//4 Create a new CartItem if the product is not in the cart.
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Invalid Data Provided!'
            });
        }
        const product = await auth_controller_1.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Product not found'
            });
        }
        let cart = await auth_controller_1.prisma.cart.findFirst({ where: { userId } });
        if (!cart) {
            cart = await auth_controller_1.prisma.cart.create({
                data: {
                    userId
                }
            });
        }
        const existCartItem = await auth_controller_1.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });
        if (existCartItem) {
            const updatedCartItem = await auth_controller_1.prisma.cartItem.update({
                where: { id: existCartItem.id },
                data: { quantity: existCartItem.quantity + quantity }
            });
            return res.status(constants_1.HttpCode.OK).json({
                success: true,
                message: 'Cart updated successfully',
                data: updatedCartItem
            });
        }
        else {
            const newCartItem = await auth_controller_1.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            });
            return res.status(constants_1.HttpCode.CREATED).json({
                success: true,
                message: 'Product added to cart',
                data: newCartItem
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'Error occured'
        });
    }
};
exports.addToCart = addToCart;
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await auth_controller_1.prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!cart) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Cart not found for the specified user'
            });
        }
        return res.status(constants_1.HttpCode.OK).json({
            success: true,
            data: cart
        });
    }
    catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
exports.fetchCartItems = fetchCartItems;
const updateCartIemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Invalid Data Provided!'
            });
        }
        const cart = await auth_controller_1.prisma.cart.findFirst({ where: { userId } });
        if (!cart) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Cart not found !'
            });
        }
        const cartItem = await auth_controller_1.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });
        if (!cartItem) {
            res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Cart item not found'
            });
        }
        const updatedCartItem = await auth_controller_1.prisma.cartItem.update({
            where: { id: cartItem?.id },
            data: { quantity }
        });
        return res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'Cart item quantity updaded succesfully',
            data: updatedCartItem
        });
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};
exports.updateCartIemQty = updateCartIemQty;
const deleteCartITems = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({
                success: false,
                message: 'Invalid Data Provided!'
            });
        }
        const cart = await auth_controller_1.prisma.cart.findFirst({
            where: { userId }
        });
        if (!cart) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Cart not found for the specified user'
            });
        }
        const cartItem = await auth_controller_1.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });
        if (!cartItem) {
            return res.status(constants_1.HttpCode.NOT_FOUND).json({ success: false, message: 'Cart item not found' });
        }
        await auth_controller_1.prisma.cartItem.delete({
            where: { id: cartItem.id }
        });
        return res.status(constants_1.HttpCode.OK).json({
            success: true,
            message: 'Cart item removed succesfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.HttpCode.INTERNAL_SERVER_ERROR).json({
            succes: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    }
};
exports.deleteCartITems = deleteCartITems;
//# sourceMappingURL=cart.controller.js.map