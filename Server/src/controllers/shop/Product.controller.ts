import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';
import { prisma } from '../auth.controller';
import { Prisma,$Enums } from '@prisma/client';

export const getFiltereProducts = async (req: Request, res: Response) => {
	try {
		const { category = '', event = '', sortBy = 'price-lowtohigh' } = req.query;

		const categoryArray = category.toString().split(',').filter(Boolean) as $Enums.Category[];
		const eventArray = event.toString().split(',').filter(Boolean) as $Enums.EventType[];
				const filters: Prisma.ProductWhereInput = {};

				if (categoryArray.length) {
					filters.category = { in: categoryArray };
				  }
				  
				  if (eventArray.length) {
					filters.event = { in: eventArray };
				  }
				  type SortOption = 'price-lowtohigh' | 'price-hightolow' | 'title-atoz' | 'title-ztoa';

		const sortMap: Record<SortOption, Prisma.ProductOrderByWithRelationInput> = {
			'price-lowtohigh': { price: 'asc' },
			'price-hightolow': { price: 'desc' },
			'title-atoz': { name: 'asc' },
			'title-ztoa': { name: 'desc' }
		};
		const sortKey = sortBy.toString() as SortOption;
		const products = await prisma.product.findMany({
			where: filters,
			orderBy: sortMap[sortKey] || { name: 'asc' }
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
