import { Handler } from "express";
import db from "../db/db";

export const handleMigrate: Handler = async (_req, res) => {
	try {
		await db.migrate.latest();
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

export const handleMigrateDown: Handler = async (_req, res) => {
	try {
		await db.migrate.down();
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};