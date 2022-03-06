import { Request, Response } from "express";
import { body, oneOf, validationResult } from "express-validator";

export const validateRegisterUserHandler = [
	body("name").isString(),
	body("email").isEmail(),
	body("password").isString(),
];

export const validatePatchProfile = oneOf([
	body("name").isString(),
	body("email").isEmail(),
]);

export const validateErrors = (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return 0;
	}
	else return 1;
};
