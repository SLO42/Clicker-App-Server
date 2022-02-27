import { getDevConfig } from "./development";
import { getProdConfig } from "./production";
import { getTestConfig } from "./testing";

const configObject = (() => {
	switch (process.env.NODE_ENV) {
		case "production":
			return getProdConfig();
		case "dev":
			return getDevConfig();
		case "test":
			return getTestConfig();
		default:
			throw TypeError("Invalid environment");
	}
})();

export const config = Object.freeze({ ...configObject });

export type Config = typeof config;
