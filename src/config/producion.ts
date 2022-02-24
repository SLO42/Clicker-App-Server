import path from "path";

export const getProdConfig = () => {
	return {
		port: Number(process.env.PORT),
		database: {
			client: "pg",
			connection: {
				host: `${process.env.DB_HOST}`,
				database: process.env.DB_NAME,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
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