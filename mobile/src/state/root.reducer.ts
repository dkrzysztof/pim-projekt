import { combineReducers } from "@reduxjs/toolkit";
import { sessionSlice } from "./session/session.slice";

const rootReducer = combineReducers({
	session: sessionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
