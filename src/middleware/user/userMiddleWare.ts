import passport from "passport";
import { Handler } from "express";

const requireUserMiddleware = passport.authenticate("jwt", { session: false });

const useUserMiddleware: Handler = (req, res, next) => {
	passport.authenticate("jwt", (_err, user) => {
		req.user = user || undefined;
		next();
	})(req, res, next);
};

export { requireUserMiddleware, useUserMiddleware };