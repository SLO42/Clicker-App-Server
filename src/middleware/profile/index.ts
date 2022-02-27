import { body, oneOf } from "express-validator";

export const validatePatchProfile = oneOf([
	body("name").isString(),
	body("email").isEmail(),
]);
