import passport from "passport";
import { Router, Handler } from "express";
import { config } from "../../config";
import { registerUser, toAuthJSON } from "../../services/user";
import { validateRegisterUserHandler } from "../../middleware/validator";

const router = Router();


/**
* @swagger
* /api/auth:
*  get:
*   summary: Ping route at Auth
*   description: Redundant ping
*   responses: 
*    200:
*     description: Success
*/
router.get("/", (_req, res) => {
	res.send("hello at auth");
});

/**
* @swagger
* /api/auth/google:
*  get:
*   summary: Initial call for google OAuth
*   description: Passport authentication with Google
*   responses: 
*    302:
*     description: Successfully redirect to main page.
*/
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }));



/**
* @swagger
* /api/auth/google/callback:
*  get:
*   summary: Callback from google OAuth
*   description: google OAuth2 callback 
*   responses: 
*    200:
*     description: Successfully redirect to main page.
*/
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
		res.status(500).json({ message: error.message, ...error });
	}
};

/**
 * POST /api/auth/register
 * @summary Registers and returns a user
 * @tags Auth
 * @return {object<Profile>} 200 - Successful response - application/json
 * @return {object<Error>} 500 - Failed response - application/json
 * @param {RequestRegisterUser} request.body.required - profile info to update
 * @example response - 200 - example successful response 
 * {"name": "John Doe", "email": "Johndoe@mail.com"}
 * @example response - 500 - example failed response 
 * { "message": "error message", "error": "...error" }
 */
router.post(
	"/register",
	validateRegisterUserHandler,
	handleRegisterUserHandler
);

/**
 * POST /api/auth/login
 * @summary Logs a user in
 * @tags Auth
 * @return {object<Profile>} 200 - Successful response - application/x-www-form-urlencoded
 * @return {object<Error>} 500 - Failed response - application/x-www-form-urlencoded
 * @param {RequestLoginUser} request.body.required - profile info to update - application/x-www-form-urlencoded
 * @example response - 200 - example successful response 
 * {"name": "John Doe", "email": "Johndoe@mail.com"}
 * @example response - 500 - example failed response 
 * { "message": "error message", "error": "...error" }
 */
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
			console.log("login");
			if (err) {
				next(err);
			}
			return res.json(toAuthJSON(user.id, user.name));
		});
	})(req, res, next)
);

export default router;
