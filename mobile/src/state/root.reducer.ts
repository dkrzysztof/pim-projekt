import { combineReducers } from "@reduxjs/toolkit";
import notesSlice from "./notes/notes.slice";
import { sessionSlice } from "./session/session.slice";

const rootReducer = combineReducers({
	session: sessionSlice.reducer,
	notes: notesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
