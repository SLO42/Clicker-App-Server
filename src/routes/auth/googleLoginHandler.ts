
import { Handler } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const googleLoginHandler: Handler = async (req, res) => {
	const {token} = req.body;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.CLIENT_ID,
	});
	const { name, email, picture } = ticket.getPayload()!;
	res.status(201);
	res.json({ name, email, picture });
};



export default googleLoginHandler;