import { Router } from "express";
import { getNotesForBook, handleNoteChange } from "../controllers";

export const noteRouter = Router();

noteRouter.post("/add-update/:bookId", handleNoteChange);
noteRouter.get("/get-notes/:bookId", getNotesForBook);
