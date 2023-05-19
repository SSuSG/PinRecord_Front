import axios from "axios";

export const API = axios.create({
	baseURL: "/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
export const IMAGE_API = axios.create({
	baseURL: "/api",
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});
