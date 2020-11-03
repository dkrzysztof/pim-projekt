import { requests } from "../agent";
import { UserLoginRequest, UserRegisterRequest } from "./requests";
import { UserLoginResponse, UserRegisterResponse } from "./responses";

const AuthApi = {
	login: (body: UserLoginRequest): Promise<UserLoginResponse> => requests.post(`Account/Login`, body),
	register: (body: UserRegisterRequest): Promise<UserRegisterResponse> => requests.post("Account/Register", body),
};

export default AuthApi;
