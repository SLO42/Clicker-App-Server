"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// .env
dotenv_1.default.config();
// the server
const server = (0, express_1.default)();
server.enable("trust proxy");
// CORS
server.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (config_1.config.accessControlAllowOrigin === "*" ||
            origin === config_1.config.accessControlAllowOrigin ||
            !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));
// Helmet
server.use((0, helmet_1.default)());
server.get('/_ah/warmup', async (_, res) => {
    try {
        // Test successful DB Connection
        await db_1.default.raw('select 1 as dbIsConnected');
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
server.listen(config_1.config.port, () => { console.log(`Server listening on port ${config_1.config.port}`); });
