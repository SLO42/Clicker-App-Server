import { getDevConfig } from "./development";
import { getProdConfig } from "./producion";

const configObject = (() => {
	switch (process.env.NODE_ENV) {
	case "production":
		return getProdConfig();
	case "dev":
		return getDevConfig();
	default:
		throw TypeError("Invalid environment");
	}
})();

export const config = Object.freeze({ ...configObject});

export type Config = typeof config;