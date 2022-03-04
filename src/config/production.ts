import path from "path";

export const getProdConfig = () => {
	return {
		version: process.env.VERSION || "0.1.0",
		apiVersion: process.env.API_VERSION || "v1",
		port: Number(process.env.PORT),
		database: {
			client: "pg",
			connection: process.env.DATABASE_URL,
			ssl: true,
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
		apiUrl: process.env.API_URL,
		siteUrl: process.env.SITE_URL,
	};
};
