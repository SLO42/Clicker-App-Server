import { expect, test, describe } from "@jest/globals";
import request from "supertest";
import server from "../src/server";
import { config } from "../src/config";
import db from "../src/db/db";

const testingCorrectUser = {
	"name": "testing",
	"email": "testing@testingmail.com",
	"password": "testingPassword"
};
const testingCorrectUserModified = {
	"name": "testing Modified",
	"email": "testing@testingModifedmail.com",
};

const testingIncorrectUser = {
	"name": "testing",
	"email": "testing",
	"password": "testing"
};

let user: any;
let userData: any;

expect.extend({
	toBeDistinct(received) {
		const pass =
			Array.isArray(received) && new Set(received).size === received.length;
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



describe("Database routes: ", () => {
	describe("(1): Testing connection to database", () => {
		test("(a): User can connect", async () => {
			async function testServer(){
				return await request(server).get("/api/_dbTestConnect/");
			}

			const res = await testServer();
			expect(res.statusCode).toBe(200);
		});
	});
	describe("(2): Testing migration route", () => {
		test("(a): responds to correct migration", async () => {
			const res = await request(server).post("/api/db/update/migrate")
				.query({apiKey: config.seedKey});
			expect(res.statusCode).toBe(200);
		});
		test("(b): responds to failed migration", async () => {
			const res = await request(server).post("/api/db/update/migrate")
				.query({apiKey: ""});
			expect(res.statusCode).toBe(403);
		});
	});
});

describe("Auth routes: ", () => {
	describe("(1): Testing auth root", () => {
		test("(a): GET responds to auth/", async () => {
			const res = await request(server).get("/api/auth/");
			expect(res.statusCode).toBe(200);
		});
	});
	describe("(2): Testing register route", () => {
		test("(a): POST responds to correct register", async () => {
			const res = await request(server)
				.post("/api/auth/register")
				.send(testingCorrectUser)
				.set("Accept", "application/json");
			expect(res.statusCode).toBe(200);
			user = await request(server).post("/api/auth/login").send(testingCorrectUser).set("Content-Type", "application/x-www-form-urlencoded");
			userData = JSON.parse(user.res.text);
		});
		test("(b): POST responds to incorrect register", async () => {
			const res = await request(server).post("/api/auth/register")
				.send(testingIncorrectUser);
			expect(res.statusCode).toBe(400);
		});
	});
});
describe("User routes: ", () => {
	describe("(1): Testing User GET", () => {
		test("(a): GET responds to user", async () => {
			const profile = await request(server).get("/api/user/").set("Authorization", `Bearer ${userData.token}`);
			expect(profile.statusCode).toBe(200);
		});
		describe("(2): Testing User PATCH", () => {
			test("(a): PATCH responds to user", async () => {
				const profile = await request(server)
					.patch("/api/user/")
					.set("Authorization", `Bearer ${userData.token}`)
					.set("Accept", "application/json")
					.send(testingCorrectUserModified);
				expect(profile.statusCode).toBe(200);
			});
		});
		describe("(3): Testing User DELETE", () => {
			test("(b): DELETE responds to user", async () => {
				const profile = await request(server)
					.delete("/api/user/confirm")
					.set("Authorization", `Bearer ${userData.token}`);
				expect(profile.statusCode).toBe(200);
			});
			test("(a): DELETE responds to user", async () => {
				const profile = await request(server)
					.delete("/api/user/")
					.set("Authorization", `Bearer ${userData.token}`);
				expect(profile.statusCode).toBe(200);
			});
		});
	});
});

afterAll(() => db.destroy());