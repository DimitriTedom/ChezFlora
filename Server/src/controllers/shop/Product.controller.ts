import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
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
      'title-ztoa': { name: 'desc' },
    };

    const products = await prisma.product.findMany({
      where: filters,
      orderBy: sortMap[sortBy] || { name: 'asc' },
    });

    res.status(HttpCode.OK).json({ success: true, data: products });
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error fetching products' });
  }
};