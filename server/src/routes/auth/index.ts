import { Router } from "express";
import googleLoginHandler from "./googleLoginHandler";

const router = Router();

router.get("/", (_req,res) => {
	res.send("hello at auth");
});

router.post("/login/google", googleLoginHandler);

export default router;