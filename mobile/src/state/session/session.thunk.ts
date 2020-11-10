import agent from "../../api/agent";
import { UserLoginRequest, UserRegisterRequest } from "../../api/auth/requests";
import { AppThunk } from "../store";
import { authenticateUserFailure, authenticateUserStart, authenticateUserSuccess, registerUserStart, registerUserFailure, registerUserSuccess } from "./session.slice";

export const authenticateUser = (body: UserLoginRequest): AppThunk => (dispatch) => {
	dispatch(authenticateUserStart());
	agent.Auth.login(body)
		.then((res) => dispatch(authenticateUserSuccess(res)))
		.catch((err) => dispatch(authenticateUserFailure(err)));
};


export const registerUser = (userToRegister: UserRegisterRequest): AppThunk => async (dispatch) => {
	dispatch(registerUserStart());
	agent.Auth.register(userToRegister)
		.then((response) => {
			dispatch(registerUserSuccess(response));
		})
		.catch((error) => 
		{			
			dispatch(registerUserFailure(error));
		});
};