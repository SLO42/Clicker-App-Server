"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdConfig = void 0;
const path_1 = __importDefault(require("path"));
const getProdConfig = () => {
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
                directory: path_1.default.join('dist/db/migrations/'),
            },
            seeds: {
                directory: path_1.default.join('src/db/seeds/'),
            },
        },
        redis: {
            host: process.env.REDISHOST || "localhost",
            port: Number(process.env.REDISPORT) || 6379,
        },
        accessControlAllowOrigin: "*",
        apiURL: process.env.API_URL,
        siteURL: process.env.SITE_URL,
    };
};
exports.getProdConfig = getProdConfig;
