import path from "path";

export const getTestConfig = () => {
	return {
		version: process.env.VERSION || "0.1.0",
		apiVersion: process.env.API_VERSION || "v1",
		port: 4242,
		database: {
			client: "pg",
			connection: {
				host: "127.0.0.1",
				database: "psql_dev",
				user: "postgres",
				password: "root",
			},
			migrations: {
				directory: path.join("dist/db/migrations/"),
			},
			seeds: {
				directory: path.join("src/db/seeds/"),
			},
		},
		redis: {
			host: process.env.REDISHOST || "localhost",
			port: Number(process.env.REDISPORT) || 6379,
		},
		accessControlAllowOrigin: "*",
		jwtSecret: process.env.JWT_SECRET || "4t^,5B#SF$",
		googleClientId: process.env.GOOGLE_CLIENT_ID,
		googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
		apiUrl: "http://localhost:4242",
		siteUrl: "http://localhost:3000",
	};
};
