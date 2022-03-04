import { body } from "express-validator";

export const validateRegisterUserHandler = [
	body("name").isString(),
	body("email").isEmail(),
	body("password").isString(),
];