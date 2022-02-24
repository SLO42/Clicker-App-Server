import { findUserById, findUserByEmail, insertUser, setUserVerified } from "../db/repos/UserRepository";
import { ensure } from "../utils/utils";
import { ResourceExistsError } from "../utils/errors";
import { randomBytes, pbkdf2Sync,  } from "crypto";
import { User } from "../types/user";

export const getUserProfile = async (id: string) => {
	const user = await findUserById(id);
	const profile = {
		name: user.name,
		email: user.email,
		verified: user.verified,
		permissions: user.permissions,
	};
	return profile;
};

export const registerUser = async (name: string, email: string, password: string) => {
	const userExists = await findUserByEmail(email);

	ensure(userExists === undefined, ResourceExistsError, "user");

	const code = Math.floor(Math.random() * 100000).toString();
	const salt = randomBytes(16).toString("hex");
	const hash = pbkdf2Sync(password, salt, 10000, 256, "sha256").toString("hex");

	const user: Omit<User, "id"> = {
		name,
		email,
		verified: false,
		verificationCode: code,
		securityCode: null,
		permissions: ["basic"],
		salt,
		hash,
	};

	const [registeredUser] = await insertUser(user);

	if (registeredUser) {
		// extend by adding email to verify users via code, 
		// can be done via routes through the client anyways so its fine.
	}
	return registeredUser;
};

export const verifyUser = async (id: string, code: string) => {
	const user = await findUserById(id);

	if (user.verified) {
		return "User verified";
	} else if (user.verificationCode === code) {
		return await setUserVerified(id);
	} else {
		throw new Error("User verification failed");
	}
};