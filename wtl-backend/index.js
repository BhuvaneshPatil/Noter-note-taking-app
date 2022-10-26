import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authenticationRouter, bookRouter, noteRouter } from "./src/routes";
import { isAuthenticated, isSignedIn } from "./src/middlewares";

dotenv.config();

const MONGOOSE_URI = process.env.MONGO_URI;
const PORT_NUMBER = 3030;
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api/auth", authenticationRouter);
app.use("/api/books", bookRouter);
app.use("/api/notes", noteRouter);

mongoose.connect(
	MONGOOSE_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log("Can't connect to network");
		} else {
			app.listen(PORT_NUMBER, () =>
				console.log(
					`Server started succesfully on port - ${PORT_NUMBER}`
				)
			);
		}
	}
);
