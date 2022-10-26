import { Book, User } from "../models";

export const addBook = async (req, res) => {
	const { bookData } = req.body;
	try {
		const newBook = new Book({ ...bookData, user: req.userId });
		await newBook.save();
		return res
			.status(201)
			.json({ message: "Book added succesfully", book: newBook });
	} catch (err) {
		return res.status(400).json({ message: "Bad Request" });
	}
};

export const editBook = async (req, res) => {
	const { bookData } = req.body;
	try {
		const updatedBook = await Book.findByIdAndUpdate(
			bookData._id,
			bookData
		);
		return res
			.status(204)
			.status({ message: "Updated successfully", updatedBook });
	} catch (error) {
		return res.status(400).json({ message: "Bad request" });
	}
};

export const deleteBook = async (req, res) => {
	const { bookId } = req.params;
};

export const getBoookById = async (req, res) => {
	try {
		const { bookId } = req.params;
		const book = await Book.findById(bookId);
		return res.status(200).json({ book });
	} catch (error) {
		return res.status(400).json({ message: "Bad request" });
	}
};

export const getBooksForUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const books = await Book.find({ user: userId }).populate("user").exec();
		return res.status(200).json({ books });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Bad Request" });
	}
};
