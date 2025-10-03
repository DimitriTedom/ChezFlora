import { Request, Response } from 'express';
import { uploadToCloudinary, deleteFromCloudinary } from '../../Helpers/cloudinary';
import { HttpCode } from '../../core/constants';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const handleImageUpload = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: 'Aucun fichier téléchargé'
			});
		}

		const result = await uploadToCloudinary(req.file);

		res.status(200).json({
			success: true,
			message: 'Image uploaded with success',
			data: {
				url: result.secure_url,
				public_id: result.public_id
			}
		});
	} catch (error) {
		console.error('Erreur upload:', error);
		res.status(500).json({
			success: false,
			message: 'An Error Occured',
			error: 'Error'
		});
	}
};

//CREATE(ADD) PRODUCT
export const addProduct = async (req: Request, res: Response) => {
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
		res.status(HttpCode.CREATED).json({
			success: true,
			data: newProduct
		});
	} catch (error) {
		console.log(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			succes: false,
			message: 'Error occured'
		});
	}
};

//READ(FETCH) PRODUCTS

export const fetchAllProducts = async (req: Request, res: Response) => {
	try {
		const listOfProducts = await prisma.product.findMany({});
		res.status(HttpCode.OK).json({
			success: true,
			data: listOfProducts
		});
	} catch (error) {
		console.log(error);
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
			succes: false,
			message: 'Error occured'
		});
	}
};
//EDIT PRODUCT

export const editProducts = async (req: Request, res: Response) => {
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
		const parsedSaleprice = saleprice ? parseFloat(saleprice) : findProduct.saleprice ?? 0;
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

		console.log(updatedProduct, 'updated product'),
			res.status(200).json({
				success: true,
				message: `${findProduct.name} updated successfully`,
				data: updatedProduct
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'An error occurred'
		});
	}
};

//DELETE PRODUCT

export const deleteProducts = async (req: Request, res: Response) => {
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
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'An error occurred'
		});
	}
};

// DELETE IMAGE FROM CLOUDINARY
export const deleteImageFromCloudinary = async (req: Request, res: Response) => {
	try {
		const { publicId } = req.body;

		if (!publicId) {
			return res.status(400).json({
				success: false,
				message: 'Public ID is required'
			});
		}

		const result = await deleteFromCloudinary(publicId);

		if (result.result === 'ok') {
			res.status(200).json({
				success: true,
				message: 'Image deleted successfully',
				data: result
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Failed to delete image',
				data: result
			});
		}
	} catch (error) {
		console.error('Error deleting image:', error);
		res.status(500).json({
			success: false,
			message: 'An error occurred while deleting image'
		});
	}
};
