import agent from "../../api/agent";
import { UserLoginRequest } from "../../api/auth/requests";
import { AppThunk } from "../store";
import { authenticateUserFailure, authenticateUserStart, authenticateUserSuccess } from "./session.slice";

export const authenticateUser = (body: UserLoginRequest): AppThunk => (dispatch) => {
	dispatch(authenticateUserStart());
	agent.Auth.login(body)
		.then((res) => dispatch(authenticateUserSuccess(res)))
		.catch((err) => dispatch(authenticateUserFailure(err)));
};
