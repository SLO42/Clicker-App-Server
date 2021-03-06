import expressJSDocSwagger from "express-jsdoc-swagger";
import express from "express";

const swaggerOptions = {
	info: {
		title: "Clicker App API",
		version: "1.0.0",
		description: "SLO42's Clicker app API",
	},
	servers: [
		{
			url: "http://localhost:4242",
			description: "Development",
		},
		{
			url: "https://clicker-app-server.herokuapp.com",
			description: "Production",
		},
	],
	security: {
		bearerToken: {
			type: "http",
			description: "sets authorization bearer to value: Please log in first",
			scheme: "bearer",
			bearerFormat: "JWT",
		}
	},
	clientId: ",",
	baseDir: "./",
	swaggerUIPath: "/api-docs",
	apiDocsPath: "/v1/api-docs",
	exposeSwaggerUI: true,
	exposeApiDocs: true,
	notRequiredAsNullable: false,
	filesPattern: ["./src/server.ts", "./src/routes/index.ts", "./src/routes/**/*.ts", "./src/types/swagger.d.ts"],
};

export const swaggerJsDoc = (server: express.Application) => {
	return expressJSDocSwagger(server)(swaggerOptions);
};

export default swaggerJsDoc;