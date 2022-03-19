import express from "express";
import { config } from "./config";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import APIRouter from "./routes";
import passport from "passport";
import { customStrategy, jwtStrategy, localStrategy } from "./services/auth"; // googleOneTapStrategy, googleStrategy,
import swaggerJsDoc from "./services/swagger";

// .env
dotenv.config();

// the server
const server = express();
server.enable("trust proxy");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// CORS
server.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// Helmet
server.use(helmet());

// Passport
passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(customStrategy);
// passport.use(googleOneTapStrategy);

// Routes
server.get("/", (__, res) => res.send("Hello from Clicker App Server: go to /api-docs for documentation"));
swaggerJsDoc(server);
server.use("/api", APIRouter);

if (process.env.NODE_ENV !== "test") server.listen(config.port, () => {
	console.log(`Server listening on port ${config.port} and running in ${process.env.NODE_ENV}`);
});

export default server;