import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const BookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: false,
		},
		reason: {
			type: String,
			required: false,
		},
		user: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book;
