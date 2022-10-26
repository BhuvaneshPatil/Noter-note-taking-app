import { Router } from "express";
import {
	addBook,
	deleteBook,
	editBook,
	getBooksForUser,
	getBoookById,
} from "../controllers";
import { isAuthenticated, isSignedIn } from "../middlewares";

export const bookRouter = Router();

bookRouter.post("/add-book", isSignedIn, isAuthenticated, addBook);
bookRouter.put("/edit-book", editBook);
bookRouter.get("/user-books/:userId", getBooksForUser);
bookRouter.put("/delete-book/:bookId", deleteBook);
bookRouter.get("/:bookId", getBoookById);
