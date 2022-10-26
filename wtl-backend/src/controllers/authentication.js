import { User } from "../models";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
	try {
		const { user } = req.body;
		if (!user?.name) {
			user.name = user.email.split("@")[0];
		}
		// check if user exist already
		User.findOne({ email: user.email }, (err, user) => {
			console.log(err);
			if (err) {
				return res.status(400).json({ message: "Bad Request" });
			} else if (user) {
				console.log("exec");
				return res.status(409).json({
					message: "User with this email already exists",
				});
			}
		});
		const newUser = new User(user);
		await newUser.save();
		const token = jwt.sign(
			{ id: newUser["_id"] },
			"sarveshankitsaurabhbhuvanesh",
			{ expiresIn: Date.now() * 9999 }
		);
		const { _id, email } = newUser;
		return res.json({
			message: "Success",
			token,
			user: { _id, email },
		});
	} catch (error) {
		return res.status(400).json({ message: "Bad request" });
	}
};

export const signIn = (req, res) => {
	try {
		const { email, password } = req.body;
		// find if user is there
		User.findOne({ email }, (err, user) => {
			if (err || !user) {
				return res
					.status(404)
					.json({ message: "User with given email does not exists" });
			}
			if (!user.comparePassword(password)) {
				return res.status(401).json({ message: "Incorrect password" });
			}
			const token = jwt.sign({ id: user["_id"] }, process.env.SECRET, {
				expiresIn: Date.now() * 9999,
			});
			const { _id, email } = user;
			return res.status(200).json({
				message: "Logged in successfully",
				token,
				user: {
					_id,
					email,
				},
			});
		});
	} catch {
		res.status(400).json({ message: "Bad request" });
	}
};
