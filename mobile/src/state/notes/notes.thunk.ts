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
	getNoteDetailsFailure,
	getNoteDetailsStart,
	getNoteDetailsSuccess,
} from "./notes.slice";

export const getUserNotes = (): AppThunk => (dispatch) => {
	dispatch(getAllNotesStart());
	agent.Notes.getAllNotes()
		.then((res) => dispatch(getAllNotesSuccess(res)))
		.catch((err) => dispatch(getAllNotesFailure(err)));
};

export const deleteUserNote = (idNote: number): AppThunk => (dispatch) => {
	dispatch(deleteNoteStart());
	agent.Notes.deleteNote(idNote)
		.then(() => dispatch(deleteNoteSuccess()))
		.catch((err) => dispatch(deleteNoteFailure(err)));
};

export const updateUserNote = (body: UpdateNoteRequest): AppThunk => (dispatch) => {
	dispatch(deleteNoteStart());
	agent.Notes.updateNote(body)
		.then(() => dispatch(deleteNoteSuccess()))
		.catch((err) => dispatch(deleteNoteFailure(err)));
};

export const getUserNoteDetails = (idNote: number): AppThunk => (dispatch) => {
	dispatch(getNoteDetailsStart());
	agent.Notes.getNoteDetails(idNote)
		.then((res) => dispatch(getNoteDetailsSuccess(res)))
		.catch((err) => dispatch(getNoteDetailsFailure(err)));
};

export const createUserNote = (body: CreateNoteRequest): AppThunk => (dispatch) => {
	dispatch(createNoteStart());
	agent.Notes.createNote(body)
		.then(() => dispatch(createNoteSuccess()))
		.catch((err) => dispatch(createNoteFailure(err)));
};
