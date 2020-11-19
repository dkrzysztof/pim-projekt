import moment from "moment";
import agent from "../../api/agent";
import { CreateNoteRequest, UpdateNoteRequest } from "../../api/note/requests";
import { AppThunk } from "../store";
import {
	createNoteFailure,
	createNoteStart,
	createNoteSuccess,
	deleteNoteFailure,
	deleteNoteStart,
	deleteNoteSuccess,
	deselectNote,
	getAllNotesFailure,
	getAllNotesStart,
	getAllNotesSuccess,
	getDailyNotesFailure,
	getDailyNotesStart,
	getDailyNotesSuccess,
	getMonthlyNotesFailure,
	getMonthlyNotesStart,
	getMonthlyNotesSuccess,
	getNoteDetailsFailure,
	getNoteDetailsStart,
	getNoteDetailsSuccess,
	getSelectedDateNotes,
	getWeeklyNotesFailure,
	getWeeklyNotesStart,
	getWeeklyNotesSuccess,
	updateNoteFailure,
	updateNoteStart,
	updateNoteSuccess,
} from "./notes.slice";

export const getUserNotes = (onSuccess?: () => void): AppThunk => (dispatch) => {
	dispatch(getAllNotesStart());
	agent.Notes.getAllNotes()
		.then((res) => {
			dispatch(getAllNotesSuccess(res));
			if (onSuccess) onSuccess();
		})
		.catch((err) => dispatch(getAllNotesFailure(err)));
};

export const deleteUserNote = (idNote: number, onSuccess?): AppThunk => (dispatch) => {
	dispatch(deleteNoteStart());
	agent.Notes.deleteNote(idNote)
		.then(() => {
			dispatch(deleteNoteSuccess());
			// dispatch(getMonthlyNotes());
			// dispatch(getDailyNotes());
			// dispatch(getSelectedDateNotes(moment().format("YYYY-MM-DD")));
			if (onSuccess) onSuccess();
		})
		.catch((err) => dispatch(deleteNoteFailure(err)));
};

export const updateUserNote = (body: UpdateNoteRequest, onSuccess?): AppThunk => (dispatch) => {
	dispatch(updateNoteStart());
	agent.Notes.updateNote(body)
		.then(() => {
			dispatch(updateNoteSuccess());
			if (onSuccess) onSuccess();
		})
		.catch((err) => dispatch(updateNoteFailure(err)));
};

export const getNoteDetails = (idNote: number, onSuccess?): AppThunk => (dispatch) => {
	dispatch(getNoteDetailsStart(idNote));
	if (onSuccess) onSuccess();
};

export const createUserNote = (body: CreateNoteRequest, onSuccess?): AppThunk => (dispatch) => {
	dispatch(createNoteStart());
	agent.Notes.createNote(body)
		.then(() => {
			dispatch(createNoteSuccess());
			if (onSuccess) onSuccess();
		})
		.catch((err) => dispatch(createNoteFailure(err)));
};

export const getDailyNotes = (onSuccess?, onFailure?): AppThunk => (dispatch) => {
	dispatch(getDailyNotesStart());
	agent.Notes.getDailyNotes()
		.then((res) => {
			dispatch(getDailyNotesSuccess(res));
			if (onSuccess) onSuccess();
		})
		.catch((err) => {
			dispatch(getDailyNotesFailure(err));
			if (onFailure) onFailure();
		});
};

export const getWeeklyNotes = (onSuccess?, onFailure?): AppThunk => (dispatch) => {
	dispatch(getWeeklyNotesStart());
	agent.Notes.getWeeklyNotes()
		.then((res) => {
			dispatch(getWeeklyNotesSuccess(res));
			if (onSuccess) onSuccess();
		})
		.catch((err) => {
			dispatch(getWeeklyNotesFailure(err));
			if (onFailure) onFailure();
		});
};

export const getMonthlyNotes = (onSuccess?, onFailure?): AppThunk => (dispatch) => {
	dispatch(getMonthlyNotesStart());
	try {
		dispatch(getMonthlyNotesSuccess());
		if (onSuccess) onSuccess();
	} catch (error) {
		dispatch(getMonthlyNotesFailure());
		if (onFailure) onFailure();
	}
};
