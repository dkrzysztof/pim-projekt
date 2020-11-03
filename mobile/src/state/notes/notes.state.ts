import { GetAllNotesResponse, GetNoteDetails } from "../../api/note/responses";
import { NoteForGetAllNotesResponse } from "../../api/note/responses/GetAllNotesResponse";
import { Status, StatusTypes } from "../utils/status.type";

export interface NotesState {
	status: {
		getAllNotes: Status;
		deleteNote: Status;
		updateNote: Status;
		getNoteDetails: Status;
		createNote: Status;
	};
	notes: NoteForGetAllNotesResponse[] | null;
	selectedNoteId: number | null;
	selectedNote: GetNoteDetails | null;
}

export const notesInitialState: NotesState = {
	status: {
		createNote: StatusTypes.INITIAL,
		deleteNote: StatusTypes.INITIAL,
		updateNote: StatusTypes.INITIAL,
		getAllNotes: StatusTypes.INITIAL,
		getNoteDetails: StatusTypes.INITIAL,
	},
	notes: null,
	selectedNote: null,
	selectedNoteId: null,
};
