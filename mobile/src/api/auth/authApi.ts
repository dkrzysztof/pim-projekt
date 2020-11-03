import { requests } from "../agent";
import { UserLoginRequest, UserRegisterRequest } from "./requests";
import { UserLoginResponse, UserRegisterResponse } from "./responses";

const AuthApi = {
	login: (body: UserLoginRequest): Promise<UserLoginResponse> => requests.post(`Account/Login`, body),
	register: (body: UserRegisterRequest): Promise<UserRegisterResponse> => requests.post("Account/Register", body),
	login2: (body: UserLoginRequest): Promise<UserLoginResponse> =>
		fetch("http://localhost:5000/api/Account/Login", { method: "POST", body: JSON.stringify(body) })
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			}),
};

export default AuthApi;
