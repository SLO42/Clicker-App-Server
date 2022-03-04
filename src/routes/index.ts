import "regenerator-runtime/runtime";
import { Router } from "express";
import authRouter from "./auth";
import { ApiMiddleware } from "../middleware/api/apiMiddleware";
import userRouter  from "./users";
import db from "../db/db";
import { useUserMiddleware } from "../middleware/user/userMiddleWare";
import seedKeyMiddleware from "../middleware/db/seedKey";
import { handleMigrate } from "./migrate";
const router = Router();

router.use(ApiMiddleware);

/**
 * GET /
 * @summary Returns swagger ui endpoint
 */

//authenticate
router.use("/auth", authRouter);
// users and profiles
router.use("/user", useUserMiddleware,  userRouter);


/**
 * POST /api/test
 * @summary Testing api for sending and request body
 * @tags test
 * @return {object<RequestBody>} 200 - success response - application/json
 * @example response - 200 - example successful response
 * { "data": "something", "more_data": "lots of stuff" }
 * @example request - example request body
 * { "data": "something", "more_data": "lots of stuff" }
 */
router.post("/test", (req, res) => {
	res.status(200);
	res.json({data: req.body});
});

/**
 * POST /api/db/update/migrate
 * @summary Migrate database
 * @tags database
 * @return {number} 200 - success response - application/json
 * @param {object<RequestMigrate>} request.query.required - apiKey
 * @example response - 200 - example successful response
 * "200"
 */
router.post("/db/update/migrate", seedKeyMiddleware, handleMigrate);

/**
 * GET /api/_dbTestConnect
 * @summary Test the connecting between server and database
 * @tags test
 * @tags database
 * @return {number} 200 - Successfully pinged database - application/json
 * @return {object} 500 - Failed to ping database
 * @example response - 200 - example successful response
 * {}
 * @example response - 500 - example failed response
 * {"message": "Internal server error", "code": 500}
*/
router.use("/_dbTestConnect", async (_, res) => {
	try {
	  // Test successful DB Connection
		await db.raw("select 1 as dbIsConnected");
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

export default router;
