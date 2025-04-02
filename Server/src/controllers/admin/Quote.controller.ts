import { HttpCode } from '../../core/constants';
import { Request, Response } from 'express';
import { prisma } from '../auth.controller';

export const getAllQuotesofAllUsers = async (req: Request, res: Response) => {
	try {
		const quotes = await prisma.quoteRequest.findMany({});
		if (!quotes) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'No quotes found'
			});
		}
		res.status(HttpCode.OK).json({
			success: true,
			message: 'quotes fetched successfully',
			data: quotes
		});
	} catch (error: unknown) {
		console.error('Error collecting All quote requests:', error);
		handleServerError(res, error);
	}
};

export const getQuotesDetailsForAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const quote = await prisma.quoteRequest.findUnique({ where: { id } });
		if (!quote) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'quote not found'
			});
		}
		res.status(HttpCode.OK).json({
			success: true,
			message: 'quote fetched successfully',
			data: quote
		});
	} catch (error: unknown) {
		console.error('Error collecting quote request DEtail:', error);
		handleServerError(res, error);
	}
};
export const handleServerError = (res: Response, error: unknown) => {
	if (error instanceof Error) {
		if (error.message.includes('prisma')) {
			return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: 'Database operation failed',
				error: process.env.NODE_ENV === 'development' ? error.message : undefined
			});
		}
	}
	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
		success: false,
		message: 'Internal server error'
	});
};
export const updateQuotesRequestStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { status, adminResponse } = req.body;

		const quote = await prisma.quoteRequest.findUnique({ where: { id } });
		if (!quote) {
			return res.status(HttpCode.NOT_FOUND).json({
				success: false,
				message: 'quote not found'
			});
		}

		const updatequote = await prisma.quoteRequest.update({
			where: { id },
			data: {
				status,
				adminResponse
			}
		});
		res.status(HttpCode.OK).json({
			success: true,
			message: `${updatequote.id} updated succesfully !`
		});
	} catch (error: unknown) {
		console.error('Error updating quote status:', error);
		handleServerError(res, error);
	}
};
