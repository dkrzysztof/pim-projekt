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
	getAllNotesFailure,
	getAllNotesStart,
	getAllNotesSuccess,
	getDailyNotesFailure,
	getDailyNotesStart,
	getDailyNotesSuccess,
	getNoteDetailsFailure,
	getNoteDetailsStart,
	getNoteDetailsSuccess,
	getWeeklyNotesFailure,
	getWeeklyNotesStart,
	getWeeklyNotesSuccess,
} from "./notes.slice";

export const getUserNotes = (): AppThunk => (dispatch) => {
	dispatch(getAllNotesStart());
	agent.Notes.getAllNotes()
		.then((res) => dispatch(getAllNotesSuccess(res)))
		.catch((err) => dispatch(getAllNotesFailure(err)));
};

export const deleteUserNote = (idNote: number, onSuccess?): AppThunk => (dispatch) => {
	dispatch(deleteNoteStart());
	agent.Notes.deleteNote(idNote)
		.then(() => {
			dispatch(deleteNoteSuccess());
			if (onSuccess) onSuccess;
		})
		.catch((err) => dispatch(deleteNoteFailure(err)));
};

export const updateUserNote = (body: UpdateNoteRequest): AppThunk => (dispatch) => {
	dispatch(deleteNoteStart());
	agent.Notes.updateNote(body)
		.then(() => dispatch(deleteNoteSuccess()))
		.catch((err) => dispatch(deleteNoteFailure(err)));
};

export const getNoteDetails = (idNote: number): AppThunk => (dispatch) => {
	dispatch(getNoteDetailsStart(idNote));
	// agent.Notes.getNoteDetails(idNote)
	// .then((res) => dispatch(getNoteDetailsSuccess(res)))
	// .catch((err) => dispatch(getNoteDetailsFailure(err)));
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
