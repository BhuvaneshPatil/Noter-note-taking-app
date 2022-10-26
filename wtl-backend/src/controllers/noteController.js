import { Note } from "../models";
export const handleNoteChange = async (req, res) => {
	try {
		const { bookId } = req.params;
		const note = await Note.findOne({ book: bookId }).exec();
		if (!note) {
			const createdNote = new Note({
				content: req.body.content,
				book: bookId,
			});
			await createdNote.save();
			return res.status(201).json({ message: "Created succesfully" });
		}
		note.content = req.body.content;
		await note.save();
		return res.status(201).json({ message: "Updated Successfully" });
	} catch (err) {
		return res.status(400).json({ message: "Bad request" });
	}
};

export const getNotesForBook = async (req, res) => {
	try {
		const { bookId } = req.params;
		const note = await Note.findOne({ book: bookId }).exec();
		if (note) {
			return res.status(200).json(note);
		}
		return res.status(404).json({ message: "No notes found for book" });
	} catch (error) {
		return res.status(400).json({ message: "Bad request" });
	}
};
