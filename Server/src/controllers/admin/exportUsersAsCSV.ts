import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Parser } from "json2csv";

const prisma = new PrismaClient();

export const exportUsersAsCSV = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
				updatedAt: true
			}
		});

		const parser = new Parser({
			fields: ["id", "name", "email", "role", "createdAt", "updatedAt"]
		});
		const csv = parser.parse(users);

		res.header("Content-Type", "text/csv");
		res.attachment("users.csv");
		res.send(csv);
	} catch (error) {
		console.error("Error exporting users:", error);
		res.status(500).json({ success: false, message: "Failed to export users" });
	}
};
