import { axiosInstance } from "./axios";

export const addBook = (data) => axiosInstance.post("api/books/add-book", data);

export const getBooksForUser = (userId) =>
	axiosInstance.get(`api/books/user-books/${userId}`);

export const getBookById = (bookId) => axiosInstance.get(`api/books/${bookId}`);
