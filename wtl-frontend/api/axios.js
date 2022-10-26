import axios from "axios";
import { BASE_URL } from "../constants";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:3030/",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});
