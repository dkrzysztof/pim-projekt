import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import store from "../state/store";
import AuthApi from "./auth/authApi";
import AppConfig from "../../web.config";
import NoteApi from "./note/noteApi";
import { devalidateSession } from "../state/session/session.slice";

const baseURL = `${AppConfig.hostname}/api`;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
	(config) => {
		const state = store.getState();
		if (state.session.info && state.session.info.token) {
			config.headers.Authorization = `Bearer ${state.session.info.token}`;
		}

		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

interface DetailedError {
	description: string;
	descriptionFormatter: string;
	errorCode: string;
	errorParameters: string[];
	isArchived: boolean;
}

axios.interceptors.response.use(undefined, (error: AxiosError) => {
	const { message, code } = error || {};

	console.error(code, message);
	if (code == "401") {
		store.dispatch(devalidateSession());
	}
	throw message;
});

const responseBodyAxios = (response: AxiosResponse) => {
	if (
		response.data &&
		typeof response.data === "object" &&
		"data" in response.data &&
		Object.keys(response.data).length === 1
	) {
		return response.data.data;
	}

	return response.data;
};

export const requests = {
	get: (url: string, params?: {}) =>
		axios
			.get(url, {
				params,
			})
			.then(responseBodyAxios),
	post: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
		axios.post(url, body, config).then(responseBodyAxios),
	put: (url: string, body: {}, config?: AxiosRequestConfig | undefined) =>
		axios.put(url, body, config).then(responseBodyAxios),
	delete: (url: string) => axios.delete(url).then(responseBodyAxios),
};

export default {
	Auth: AuthApi,
	Notes: NoteApi,
};
