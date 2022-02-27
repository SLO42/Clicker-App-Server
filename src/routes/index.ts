import "regenerator-runtime/runtime";
import { Router, Handler } from "express";
import authRouter from "./auth";
import { ApiMiddleware } from "../middleware/api/apiMiddleware";
import userRouter  from "./users";

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

export default router;
