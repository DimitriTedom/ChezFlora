import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

//Add to cart. this is thelogic i propose :
//1 Find or create a cart for the user.
//2 Check if the product exists before adding it.
//3 Update quantity if the product is already in the cart.
//4 Create a new CartItem if the product is not in the cart.

export const addToCart = async (req: Request, res: Response) => {
	try {
		const { userId, productId, quantity } = req.body;
		if (!userId || !productId || quantity <= 0) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Invalid Data Provided!'
			});
		}
		const product = await prisma.product.findUnique({ where: { id: productId } });
		if (!product) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'Product not found'
			});
		}
		let cart = await prisma.cart.findFirst({ where: { userId } });
		if (!cart) {
			cart = await prisma.cart.create({
				data: {
					userId
				}
			});
		}
		const existCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productId: productId
			}
		});
		if (existCartItem) {
			const updatedCartItem = await prisma.cartItem.update({
				where: { id: existCartItem.id },
				data: { quantity: existCartItem.quantity + quantity }
			});
			return res.status(HttpCode.OK).json({
				success: true,
				message: 'Cart updated successfully',
				data: updatedCartItem
			});
		} else {
			const newCartItem = await prisma.cartItem.create({
				data: {
					cartId: cart.id,
					productId,
					quantity
				}
			});
			return res.status(HttpCode.CREATED).json({
				success: true,
				message: 'Product added to cart',
				data: newCartItem
			});
		}
	} catch (error: any) {
		console.log(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			succes: false,
			message: 'Error occured'
		});
	}
};

export const fetchCartItems = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const cart = await prisma.cart.findFirst({
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
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'Cart not found for the specified user'
			});
		}

		return res.status(HttpCode.OK).json({
			success: true,
			data: cart
		});
	} catch (error) {
		console.error('Error fetching cart items:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error'
		});
	}
};

export const updateCartIemQty = async (req: Request, res: Response) => {
	try {
		const { userId, productId, quantity } = req.body;
		if (!userId || !productId || quantity <= 0) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Invalid Data Provided!'
			});
		}

		const cart = await prisma.cart.findFirst({ where: userId });
		if (!cart) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'Cart not found !'
			});
		}
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productId: productId
			}
		});
		if (!cartItem) {
			res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'Cart item not found'
			});
		}
		const updatedCartItem = await prisma.cartItem.update({
			where: { id: cartItem?.id },
			data: { quantity }
		});
		return res.status(HttpCode.OK).json({
			success: true,
			message: 'Cart item quantity updaded succesfully',
			data: updatedCartItem
		});
	} catch (error: any) {
		console.log(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			succes: false,
			message: 'INTERNAL_SERVER_ERROR'
		});
	}
};

export const deleteCartITems = async (req: Request, res: Response) => {
	try {
		const { userId, productId } = req.body;
		if (!userId || !productId) {
			return res.status(HttpCode.BAD_REQUEST).json({
				success: false,
				message: 'Invalid Data Provided!'
			});
		}
		const cart = await prisma.cart.findFirst({
			where: { userId }
		});
		if (!cart) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'Cart not found for the specified user'
			});
		}
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productId: productId
			}
		});
		if (!cartItem) {
			return res.status(HttpCode.NOT_FOUND).json({ success: false, message: 'Cart item not found' });
		}
		await prisma.cartItem.delete({
			where: { id: cartItem.id }
		});

		return res.status(HttpCode.OK).json({
			success: true,
			message: 'Cart item removed succesfully'
		});
	} catch (error: any) {
		console.log(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			succes: false,
			message: 'INTERNAL_SERVER_ERROR'
		});
	}
};
