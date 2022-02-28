import "regenerator-runtime/runtime";
import { Router, Handler } from "express";
import authRouter from "./auth";
import { ApiMiddleware } from "../middleware/api/apiMiddleware";
import userRouter  from "./users";
import db from "../db/db";

const router = Router();

router.use(ApiMiddleware);

const apiRootRouteHandler: Handler = (__, res) => {
	res.status(200);
	res.json({ success: true });
};

//root 
router.get("/", apiRootRouteHandler);
//authenticate
router.use("/auth", authRouter);
// users and profiles
router.use("/user", userRouter);

router.use("/_dbTestConnect", async (_, res) => {
	try {
	  // Test successful DB Connection
		await db.raw("select 1 as dbIsConnected");
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

export default router;
