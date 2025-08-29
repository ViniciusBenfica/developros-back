import { Express } from "express";
import prisma from "../utils/database.js";
import crypto from "crypto";

export default function shortenRoutes(app: Express) {
	app.post("/shorten", async (request, reply) => {
		const { url } = request.body as { url?: string };
		if (!url) return reply.status(400).send({ error: "URL is required" });

		const existing = await prisma.shortUrl.findFirst({ where: { target: url } });
		if (existing) return reply.status(200).send({ url: `${process.env.CALLBACK_URL}${existing.code}` });

		const code = crypto.randomBytes(4).toString("base64url").slice(0, 6);
		await prisma.shortUrl.create({ data: { target: url, code } });

		return reply.status(201).send({ url: `${process.env.CALLBACK_URL}${code}` });
	});
}
