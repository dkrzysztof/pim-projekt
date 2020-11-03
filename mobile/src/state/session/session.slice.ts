import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginResponse } from "../../api/auth/responses";
import { StatusTypes } from "../utils/status.type";
import { sessionInitialState, SessionState } from "./session.state";

export const sessionSlice = createSlice({
	name: "session",
	initialState: sessionInitialState,
	reducers: {
		authenticateUserStart: (state: SessionState) => {
			state.status.authenticateUser = StatusTypes.LOADING;
		},
		authenticateUserSuccess: (state: SessionState, action: PayloadAction<UserLoginResponse>) => {
			state.status.authenticateUser = StatusTypes.SUCCESS;
			console.log(action.payload);
			state.info = action.payload;
		},
		authenticateUserFailure: (state: SessionState, action: PayloadAction<string>) => {
			state.status.authenticateUser = StatusTypes.ERROR;

			console.error(action.payload);
			state.info = sessionInitialState.info;
		},

		///

		devalidateSession: (state: SessionState) => {
			state.info = { ...sessionInitialState.info };
		},
	},
});

export const {
	authenticateUserStart,
	authenticateUserSuccess,
	authenticateUserFailure,
	devalidateSession,
} = sessionSlice.actions;
