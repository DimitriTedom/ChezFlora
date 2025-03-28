import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';
import { prisma } from '../auth.controller';

export const getFiltereProducts = async (req: Request, res: Response) => {
	try {
		const { category = [], event = [], sortBy = 'price-lowtohigh' } = req.query;
		const filters: Record<string, any> = {};

		if (category.length) {
			filters.category = { in: category.toString().split(',') };
		}
		if (event.length) {
			filters.event = { in: event.toString().split(',') };
		}

		const sortMap: Record<string, any> = {
			'price-lowtohigh': { price: 'asc' },
			'price-hightolow': { price: 'desc' },
			'title-atoz': { name: 'asc' },
			'title-ztoa': { name: 'desc' }
		};

		const products = await prisma.product.findMany({
			where: filters,
			orderBy: sortMap[sortBy] || { name: 'asc' }
		});

		res.status(HttpCode.OK).json({ success: true, data: products });
	} catch (error) {
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching products' });
	}
};

export const getProductDetails = async (req: Request, res: Response) => {
	try {
        const {id} = req.params;
        const product = await prisma.product.findUnique({where: {id}});

        if (!product) {
            return res.status(HttpCode.NOT_FOUND).json({
                success: false,
                message: 'Product not found!'
            });
        }
        res.status(HttpCode.OK).json({
            success:true,
            message:"Product found !",
            data: product
        })
	} catch (error) {
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching products' });
	}
};
