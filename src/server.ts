import express from "express";
import { config } from "./config";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import APIRouter from "./routes";
import passport from "passport";
import { googleStrategy, jwtStrategy, localStrategy } from "./services/auth";

// .env
dotenv.config();

// the server
const server = express();
server.enable("trust proxy");
server.use(express.json());

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

// Passport 

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

// Routes
server.use("/api", APIRouter);

server.listen(config.port, ()=> {console.log(`Server listening on port ${config.port}`);});