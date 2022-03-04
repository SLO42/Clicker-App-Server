import {
	findUserById,
	findUserByEmail,
	insertUser,
	setUserVerified,
	findUserByGoogleId,
	findUserByEmailAndUpdate,
	findUserByIdAndUpdate,
	removeUser,
} from "../db/repos/UserRepository";
import { randomBytes, pbkdf2Sync } from "crypto";
import { User } from "../types/user";
import jwt from "jsonwebtoken";
import { config } from "../config";

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

export const registerUser = async (
	name: string,
	email: string,
	password: string
) => {
	const userExists = await findUserByEmail(email);
	if (userExists){
		throw new Error("user exists");
	}

	const code = Math.floor(Math.random() * 100000).toString();
	const salt = randomBytes(16).toString("hex");
	const hash = pbkdf2Sync(password, salt, 10000, 256, "sha256").toString("hex");
	
	const user: Omit<User, "id"> = {
		name,
		email,
		verified: false,
		verificationCode: code,
		securityCode: null,
		permissions: "basic",
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

export const findGoogleUserOrCreate = async (
	googleId: string,
	name: string,
	email: string
) => {
	const user = await findUserByGoogleId(googleId);
	if (user !== undefined) {
		return user;
	} else {
		const user: Omit<User, "id"> = {
			name,
			email,
			permissions: "basic",
			googleId,
			verified: true,
			verificationCode: null,
			securityCode: null,
			salt: "",
			hash: "",
		};
		const [registeredUser] = await insertUser(user);
		return registeredUser;
	}
};

export const forgotPassword = async (email: string) => {
	const code = Math.floor(Math.random() * 100000).toString();
	const user = await findUserByEmailAndUpdate(email, {
		securityCode: code,
	});
	if (user && user.id) {
		// sendForgotPasswordEmail(email, user.id, code);
		return { status: 200, message: `Reset Link has been sent to ${email}` };
	} else {
		return { status: 400, message: "Email entered is not valid" };
	}
};

export const resetPassword = async (
	id: string,
	code: string,
	password: string
) => {
	const user = await findUserById(id);

	if (user.securityCode === code) {
		const salt = randomBytes(16).toString("hex");
		const hash = pbkdf2Sync(password, salt, 10000, 256, "sha256").toString(
			"hex"
		);
		const updatedUser = await findUserByIdAndUpdate(id, {
			salt,
			hash,
			securityCode: null,
		});
		if (updatedUser) {
			// sendPasswordChangedEmail(updatedUser.email);
		}
		return updatedUser;
	} else {
		throw new Error("User verification failed");
	}
};

export const updateProfile = async (
	id: string,
	name: string,
	email: string
) => {
	const user = await findUserById(id);
	
	if (user) {
		if (user.email !== email) {
			const code = Math.floor(Math.random() * 100000).toString();
			const updatedUser = await findUserByIdAndUpdate(id, {
				name,
				email,
				verified: false,
				verificationCode: code,
			});
			if (updatedUser) {
				// sendActivationEmail(name, email, updatedUser.id as string, code);
			}
			return updatedUser;
		} else {
			const updatedUser = await findUserByIdAndUpdate(id, {
				name,
				email,
			});
			return updatedUser;
		}
	} else {
		throw new Error("User not found");
	}
};

export const markUserAsDeleted = async (id: string) => {
	const user = await findUserById(id);

	if (user) {
		return await removeUser(id);
	} else {
		throw new Error("User not found");
	}
};

const generateJWT = (id: string) => {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);
	return jwt.sign(
		{
			sub: id,
			exp: exp.getTime() / 1000,
		},
		config.jwtSecret
	);
};

export const toAuthJSON = (id: string, name: string) => {
	return {
		id,
		name,
		message: "Successfully Logged In",
		status: 200,
		token: generateJWT(id),
	};
};
