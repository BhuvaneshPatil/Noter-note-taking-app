import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: false,
		},
		book: {
			type: mongoose.Types.ObjectId,
			ref: "Book",
		},
	},
	{ timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
