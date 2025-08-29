import { Express } from "express";
import prisma from "../utils/database.js";

export default function redirectsRoutes(app: Express) {
	app.get("/:code", async (request, reply) => {
		const { code } = request.params as { code: string };

		const shortUrl = await prisma.shortUrl.findFirst({ where: { code } });

		if (!shortUrl) {
			return reply.status(404).send({ error: "URL not found" });
		}

		return reply.redirect(shortUrl.target);
	});
}
