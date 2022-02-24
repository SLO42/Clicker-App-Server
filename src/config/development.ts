import path from "path";

export const getDevConfig = () => {
	return {
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
	};
};