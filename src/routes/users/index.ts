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


/**
 * GET /api/user/profile
 * @summary Returns a profile
 * @tags User
 * @security siteLogin
 * @return {object<Profile>} 200 - Successful response - application/json
 * @return {object<Error>} 500 - Failed response - application/json
 * @example response - 200 - example successful response 
 * {"name": "John Doe", "email": "Johndoe@mail.com"}
 * @example response - 500 - example failed response 
 * { "message": "error message", "error": "...error" }
 */
router.get("/profile", getProfileHandler);

/**
 * Patch /api/user/
 * @summary updates a users profile
 * @tags User
 * @security siteLogin
 * @return {object<Profile>} 200 - Successful response - application/json
 * @return {object<Error>} 500 - Failed response - application/json
 * @param {RequestPatchProfile} request.body.required - profile info to update
 * @example response - 200 - example successful response 
 * {"name": "John Doe", "email": "Johndoe@mail.com"}
 * @example response - 500 - example failed response 
 * { "message": "error message", "error": "...error" }
 */
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
