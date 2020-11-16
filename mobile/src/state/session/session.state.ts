import { Status, StatusTypes } from "../utils/status.type";

export interface SessionState {
	status: {
		authenticateUser: Status;
		registerUser: Status;
	};
	info: {
		token: string | null;
		refreshToken: string | null;
	};
	user: null;
}

export const sessionInitialState: SessionState = {
	status: {
		authenticateUser: StatusTypes.INITIAL,
		registerUser: StatusTypes.INITIAL
	},
	info: {
		refreshToken: null,
		token: null,
	},
	user: null,
};
