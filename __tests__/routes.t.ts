import { expect, test, describe } from "@jest/globals";
import request from "supertest";
import express  from "express";
import APIRouter from "../src/routes";

const server = express();

server.use("/api", APIRouter);

expect.extend({
	toBeDistinct(received) {
		const pass = Array.isArray(received) && new Set(received).size === received.length;
		if (pass) {
			return {
				message: () => `expected [${received}] array is unique`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected [${received}] array is not to unique`,
				pass: false,
			};
		}
	},
});


describe("(1): Testing root API Route", () => {
	test("(default 1): responds to /api/", async () => {
		const res = await request(server).get("/api/");
		expect(res.statusCode).toBe(200);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});
});