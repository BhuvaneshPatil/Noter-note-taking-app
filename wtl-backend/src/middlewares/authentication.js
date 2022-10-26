import { expressjwt } from "express-jwt";
export const isSignedIn = expressjwt({
	secret: "sarveshankitsaurabhbhuvanesh",
	userProperty: "auth",
	algorithms: ["HS256"],
});

export const isAuthenticated = (req, res, next) => {
	let checker = true;
	console.log(req.auth);
	if (!checker) {
		return res.status(403).json({ error: "Access denied!" });
	}
	req.authenticated = true;
	req.userId = req.auth.id;
	next();
};
