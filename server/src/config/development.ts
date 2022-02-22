

export const getDevConfig = () => {
    return {
        port: 3000,
        database: {
            client: "pg",
            connection: {
                host: "127.0.0.1",
                database: "psql_dev",
                user: "postgres",
                password: "root",
            },
        },
        redis: {
            host: process.env.REDISHOST || "localhost",
            port: Number(process.env.REDISPORT) || 6379,
        },
        accessControlAllowOrigin: "*",
        apiURL: 'http://localhost:3000',
        siteURL: 'http://localhost',
    }
};