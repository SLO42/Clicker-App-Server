"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevConfig = void 0;
const path_1 = __importDefault(require("path"));
const getDevConfig = () => {
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
        apiURL: 'http://localhost:3000',
        siteURL: 'http://localhost',
    };
};
exports.getDevConfig = getDevConfig;
