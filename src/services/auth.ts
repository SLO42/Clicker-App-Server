import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth2";
import passportCustom from "passport-custom";
import { config } from "../config";
import { findUserByEmail, findUserById } from "../db/repos/UserRepository";
import { pbkdf2Sync } from "crypto";
import { findGoogleUserOrCreate } from "./user";
import { parseJwt } from "../utils/utils";
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const CustomStrategy = passportCustom.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const validPassword = (password: string, salt: string, userHash: string) => {
	const hash = pbkdf2Sync(password, salt, 10000, 256, "sha256").toString("hex");
	return userHash === hash;
};

export const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
		session: false,
	},
	(email: string, password: string, done: any) => {
		findUserByEmail(email)
			.then((user) => {
				if (!user) {
					return done(null, false, {
						message: "User does not exist",
					});
				} else if (user && !validPassword(password, user.salt, user.hash)) {
					return done(null, false, {
						message: "Password us invalid",
					});
				}
				const userInfo = {
					id: user.id,
					name: user.name,
					email: user.email,
					permissions: user.permissions,
				};
				return done(null, userInfo, {
					message: "Logged in successfully",
				});
			})
			.catch(done);
	}
);

export const jwtStrategy = new JWTStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.jwtSecret,
	},
	async function (jwtPayload: any, cb: CallableFunction) {
		//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
		try {
			const user = await findUserById(jwtPayload.sub);
			// return user data in api request as user object
			const profile = {
				id: user.id,
				name: user.name,
				email: user.email,
				permissions: user.permissions,
			};
			return cb(null, profile);
		} catch (err) {
			return cb(err);
		}
	}
);

export const googleStrategy = new GoogleStrategy(
	{
		clientID: config.googleClientId!,
		clientSecret: config.googleClientSecret!,
		callbackURL: `${config.apiUrl}/api/auth/google/callback`,
	},
	function (_accessToken: any, _refreshToken: any, profile: any, done: any) {
		findGoogleUserOrCreate(profile.id, profile._json.name, profile._json.email)
			.then((user) => {
				if (!user) {
					return done(null, undefined, {
						message: "User does not exist",
					});
				}
				return done(null, user, { message: "Logged In Successfully" });
			})
			.catch(done);
	}
);


export const googleOneTapStrategy = new GoogleOneTapStrategy(
	{
		clientID: config.googleClientId! || "",
		clientSecret: config.googleClientSecret! || "",
		verifyCsrfToken: false,
	},
	(profile: any, done: any) => { 
		findGoogleUserOrCreate(profile.id, profile.displayName, profile.emails[0].value)
			.then((user) => {
				if (!user) {
					return done(null, undefined, {
						message: "User does not exist",
					});
				}
				return done(null, user, { message: "Logged In Successfully" });
			})
			.catch(done);
	}
);

export const customStrategy = new CustomStrategy((req, done) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (token) {
		const parsedToken = parseJwt(token);
		findGoogleUserOrCreate(parsedToken.sub, parsedToken.name, parsedToken.email)
			.then((user) => {
				if (!user) {
					return done({message: "Could not create user"}, undefined);
				}
				return done(null, user);
			})
			.catch(done);
	}
	done({message: "Authorization required"}, undefined);
});