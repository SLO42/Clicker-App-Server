import { body, oneOf } from "express-validator";

export const validateRegisterUserHandler = [
	body("name").isString(),
	body("email").isEmail(),
	body("password").isString(),
];

export const validatePatchProfile = oneOf([
	body("name").isString(),
	body("email").isEmail(),
]);
