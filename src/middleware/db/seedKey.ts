import { NextFunction, Request, Response } from "express";
import { config } from "../../config";

const seedMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (typeof config.seedKey === "undefined") {
			throw new Error("No Seed Key Set");
		}
		if (req.query.apiKey === config.seedKey) {
			next();
		} else {
			throw new Error(req.query.apiKey ? "Invalid Seed API Key" : "No Seed API Key");
		}
	} catch (error) {
		res.sendStatus(403);
	}
};

export default seedMiddleware;