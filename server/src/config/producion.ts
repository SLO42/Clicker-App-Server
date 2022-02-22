

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
        },
        redis: {
            host: process.env.REDISHOST || "localhost",
            port: Number(process.env.REDISPORT) || 6379,
        },
        accessControlAllowOrigin: "*",
        apiURL: process.env.API_URL,
        siteURL:  process.env.SITE_URL,
    }
};