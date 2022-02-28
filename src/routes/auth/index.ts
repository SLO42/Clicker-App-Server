import passport from "passport";
import { Router, Handler } from "express";
import { config } from "../../config";
import { registerUser, toAuthJSON } from "../../services/user";
import { body } from "express-validator";

const router = Router();

router.get("/", (_req, res) => {
	res.send("hello at auth");
});

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", (req, res, next) =>
	passport.authenticate("google", { session: false}, (err, user, info) => {
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

const validateRegisterUserHandler = [
	body("name").isString(),
	body("email").isEmail(),
	body("password").isString(),
];

router.post(
	"/register",
	validateRegisterUserHandler,
	handleRegisterUserHandler
);


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
