import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateNoteRequest } from "../../api/note/requests";
import {
	DeleteNoteResponse,
	GetAllNotesResponse,
	GetDailyNotesResponse,
	GetNoteDetails,
	GetWeeklyNotesResponse,
	UpdateNoteResponse,
} from "../../api/note/responses";
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

		getNoteDetailsStart: (state: NotesState, action: PayloadAction<number>) => {
			state.status.getNoteDetails = StatusTypes.SUCCESS;
			const noteId = action.payload;
			state.selectedNoteId = noteId;
			state.selectedNote = state.notes?.find((val) => val.id === noteId) || null;
		},
		getNoteDetailsSuccess: (state: NotesState, action: PayloadAction<GetNoteDetails>) => {
			state.status.getNoteDetails = StatusTypes.SUCCESS;
			// state.selectedNote = action.payload;
			// state.selectedNoteId = action.payload.id;
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

		///

		getDailyNotesStart: (state: NotesState) => {
			state.status.getDailyNotes = StatusTypes.LOADING;
			// state.notesDaily = null;
		},
		getDailyNotesSuccess: (state: NotesState, action: PayloadAction<GetDailyNotesResponse>) => {
			state.status.getDailyNotes = StatusTypes.SUCCESS;
			state.notesDaily = action.payload.sortedNotesResponses;
		},
		getDailyNotesFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.getDailyNotes = StatusTypes.ERROR;
			state.notes = null;
		},

		///

		getWeeklyNotesStart: (state: NotesState) => {
			state.status.getWeeklyNotes = StatusTypes.LOADING;
			// state.notesWeekly = null;
		},
		getWeeklyNotesSuccess: (state: NotesState, action: PayloadAction<GetWeeklyNotesResponse>) => {
			state.status.getWeeklyNotes = StatusTypes.SUCCESS;
			state.notesWeekly = action.payload.sortedNotesResponses;
		},
		getWeeklyNotesFailure: (state: NotesState, action: PayloadAction<string>) => {
			state.status.getWeeklyNotes = StatusTypes.ERROR;
			state.notes = null;
		},

		///

		deselectNote: (state: NotesState) => {
			state.selectedNoteId = null;
			state.selectedNote = null;
		},

		///

		getSelectedDateNotes: (state: NotesState, action: PayloadAction<string>) => {
			state.selectedDayNotes =
				state.notes?.filter((day) => {
					console.log(day.eventDate);
					return day.eventDate === action.payload;
				}) || null;
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
	getDailyNotesFailure,
	getDailyNotesStart,
	getDailyNotesSuccess,
	getWeeklyNotesFailure,
	getWeeklyNotesStart,
	getWeeklyNotesSuccess,
	deselectNote,
	getSelectedDateNotes,
} = notesSlice.actions;

export default notesSlice;
