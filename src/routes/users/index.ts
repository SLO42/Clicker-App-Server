import { Handler, Router } from "express";
import {
	getUserProfile,
	markUserAsDeleted,
	updateProfile,
} from "../../services/user";
import { validatePatchProfile } from "../../middleware/profile";

const router = Router();

const getProfileHandler: Handler = async (req, res) => {
	try {
		if (req.user) {
			const { id: userId } = req.user!;
			const profile = await getUserProfile(userId);
			res.json(profile);
		}
	} catch (error) {
		console.error(error.message, error);
		res.status(500).json({ message: error.message, ...error });
	}
};

router.get("/profile", getProfileHandler);

const patchProfileHandler: Handler = async (req, res) => {
	try {
		const { id: userId } = req.user!;
		const { name, email } = req.body;
		const profile = await updateProfile(userId, name, email);
		res.json(profile);
	} catch (error) {
		console.error(error.message, error);
		res.status(500).json({ message: error.message, ...error });
	}
};

router.patch("/", validatePatchProfile, patchProfileHandler);

const deleteProfileHandler: Handler = async (req, res) => {
	try {
		const { id: userId } = req.user!;
		const profile = await markUserAsDeleted(userId);
		res.json(profile);
	} catch (error) {
		console.error(error.message, error);
		res.status(500).json({ message: error.message, ...error });
	}
};

router.delete("/", deleteProfileHandler);

export default router;
