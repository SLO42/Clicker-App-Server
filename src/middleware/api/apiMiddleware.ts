import { RequestHandler } from "express";
import { config } from "../../config";

export const ApiMiddleware: RequestHandler = (_req, res, next) => {
	res.append("apiVersion", config.apiVersion);
	next();
};
