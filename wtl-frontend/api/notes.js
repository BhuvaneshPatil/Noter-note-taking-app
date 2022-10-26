import { axiosInstance } from "./axios";

export const handleAddUpdate = (data, bookId) =>
	axiosInstance.post(`/api/notes/add-update/${bookId}`, data);

export const getNotesForBook = (bookId) =>
	axiosInstance.get(`/api/notes/get-notes/${bookId}`);
