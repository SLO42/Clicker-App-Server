import express from "express";

import db from "./db/db";
import { config } from "./config";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// .env
dotenv.config();

// the server
const server = express();
server.enable("trust proxy");

// CORS
server.use(
    cors({
        origin: (origin, callback) => {
            if (
                config.accessControlAllowOrigin === "*" ||
                origin === config.accessControlAllowOrigin ||
                !origin
            ){
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    }),
);

// Helmet
server.use(helmet());

server.get('/_ah/warmup', async (_, res) => {
    try {
      // Test successful DB Connection
        await db.raw('select 1 as dbIsConnected');
        res.sendStatus(200);
    } catch (error) {
        console.error(error)
        res.sendStatus(500);
    }
});

server.listen(config.port, ()=> {console.log(`Server listening on port ${config.port}`)});