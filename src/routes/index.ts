import "regenerator-runtime/runtime";
import { Router, Handler } from "express";
import AuthRouter from "./auth";
import {ApiMiddleware} from "../middleware/api/apiMiddleware";

const router = Router();

router.use(ApiMiddleware);

const apiRootRouteHandler: Handler = (__, res) => {
	res.status(200);
	res.json({"success": true});
};

router.get("/", apiRootRouteHandler);


router.use("/auth", AuthRouter);

export default router;