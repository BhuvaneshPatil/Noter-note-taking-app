import { axiosInstance } from "./axios";

export const userLogin = (data) => axiosInstance.post("api/auth/sign-in", data);

export const userSignup = (data) =>
	axiosInstance.post("api/auth/sign-up", data);
