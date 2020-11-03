import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateNoteRequest } from "../../api/note/requests";
import { DeleteNoteResponse, GetAllNotesResponse, GetNoteDetails, UpdateNoteResponse } from "../../api/note/responses";
import { StatusTypes } from "../utils/status.type";
import { notesInitialState, NotesState } from "./notes.state";

const notesSlice = createSlice({
	name: "notes",
	initialState: notesInitialState,
	reducers: {
		getAllNotesStart: (state: NotesState) => {
			state.status.getAllNotes = StatusTypes.LOADING;
		},
		getAllNotesSuccess: (state: NotesState, action: PayloadAction<GetAllNotesResponse>) => {
			state.status.getAllNotes = StatusTypes.SUCCESS;
			state.notes = action.payload.notesResponses;
		},
		getAllNotesFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.getAllNotes = StatusTypes.ERROR;
			state.notes = null;
		},

		///

		getNoteDetailsStart: (state: NotesState) => {
			state.status.getNoteDetails = StatusTypes.LOADING;
		},
		getNoteDetailsSuccess: (state: NotesState, action: PayloadAction<GetNoteDetails>) => {
			state.status.getNoteDetails = StatusTypes.SUCCESS;
			state.selectedNote = action.payload;
			state.selectedNoteId = action.payload.id;
		},
		getNoteDetailsFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.getNoteDetails = StatusTypes.ERROR;
			state.selectedNote = null;
			state.selectedNoteId = null;
		},

		///

		deleteNoteStart: (state: NotesState) => {
			state.status.deleteNote = StatusTypes.LOADING;
		},
		deleteNoteSuccess: (state: NotesState) => {
			state.status.deleteNote = StatusTypes.SUCCESS;
		},
		deleteNoteFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.deleteNote = StatusTypes.ERROR;
		},

		///

		createNoteStart: (state: NotesState) => {
			state.status.createNote = StatusTypes.LOADING;
		},
		createNoteSuccess: (state: NotesState) => {
			state.status.createNote = StatusTypes.SUCCESS;
		},
		createNoteFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.createNote = StatusTypes.ERROR;
		},

		///

		updateNoteStart: (state: NotesState) => {
			state.status.updateNote = StatusTypes.LOADING;
		},
		updateNoteSuccess: (state: NotesState) => {
			state.status.updateNote = StatusTypes.SUCCESS;
		},
		updateNoteFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.updateNote = StatusTypes.ERROR;
		},
	},
});

export const {
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
	updateNoteFailure,
	updateNoteStart,
	updateNoteSuccess,
} = notesSlice.actions;

export default notesSlice;
