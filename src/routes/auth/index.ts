import passport from "passport";
import { Router, Handler } from "express";
import { config } from "../../config";
import { registerUser, toAuthJSON, verifyUser } from "../../services/user";
import { body, param } from "express-validator";

const router = Router();

router.get("/", (_req, res) => {
	res.send("hello at auth");
});

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", (req, res, next) =>
	passport.authenticate("google", { session: false }, (err, user, info) => {
		if (err || !user) {
			console.log(err, user);
			return res.status(200).json({
				message: info ? info.message : "Login failed",
				user: user,
				status: 400,
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				next(err);
			}
			const data = toAuthJSON(user.id, user.name);
			res.redirect(`${config.siteUrl}/?token=${data.token}&name=${data.name}`);
		});
	})(req, res, next)
);

const handleRegisterUserHandler: Handler = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await registerUser(name, email, password);
		res.json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const validateRegisterUserHandler = [
	body("name").isString(),
	body("email").isEmail(),
	body("password").isString(),
];
export const validateVerifyUser = [
	param("id").isString(),
	param("code").isString(),
];

export const validateForgotPassword = [body("email").isEmail()];

export const validateResetPassword = [
	body("id").isString(),
	body("code").isString(),
	body("password").isString(),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password confirmation does not match password");
		}
		return true;
	}),
];

router.post(
	"/register",
	validateRegisterUserHandler,
	handleRegisterUserHandler
);

const handleEmailVerification: Handler = async (req, res) => {
	const { id, code } = req.params;
	try {
		await verifyUser(id, code);
		res.sendStatus(200);
	} catch (error) {
		res.status(500).json({ error });
	}
};
router.get("/verify/:id/:code", validateVerifyUser, handleEmailVerification);

router.post("/login", (req, res, next) =>
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(200).json({
				message: info ? info.message : "Login failed",
				user: user,
				status: 400,
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				next(err);
			}
			return res.json(toAuthJSON(user.id, user.name));
		});
	})(req, res, next)
);

export default router;
