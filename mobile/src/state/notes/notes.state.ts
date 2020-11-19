import { GetAllNotesResponse, GetNoteDetails, WeekForGetWeeklyNotesResponse } from "../../api/note/responses";
import { NoteForGetAllNotesResponse } from "../../api/note/responses/GetAllNotesResponse";
import { DayForGetDailyNotesResponse } from "../../api/note/responses/GetDailyNotesResponse";
import { Status, StatusTypes } from "../utils/status.type";

export interface NotesState {
	status: {
		getAllNotes: Status;
		getDailyNotes: Status;
		getWeeklyNotes: Status;
		getMonthlyNotes: Status;
		deleteNote: Status;
		updateNote: Status;
		getNoteDetails: Status;
		createNote: Status;
	};
	notes: NoteForGetAllNotesResponse[] | null;
	notesDaily: DayForGetDailyNotesResponse[] | null;
	notesWeekly: WeekForGetWeeklyNotesResponse[] | null;
	notesMonthly: any | null;
	selectedNoteId: number | null;
	selectedNote: NoteForGetAllNotesResponse | null;
	selectedDayNotes: DayForGetDailyNotesResponse[] | null;
	selectedDay: string | null;
}

export const notesInitialState: NotesState = {
	status: {
		createNote: StatusTypes.INITIAL,
		deleteNote: StatusTypes.INITIAL,
		updateNote: StatusTypes.INITIAL,
		getAllNotes: StatusTypes.INITIAL,
		getDailyNotes: StatusTypes.INITIAL,
		getWeeklyNotes: StatusTypes.INITIAL,
		getMonthlyNotes: StatusTypes.INITIAL,
		getNoteDetails: StatusTypes.INITIAL,
	},
	notes: null,
	notesMonthly: null,
	notesDaily: null,
	notesWeekly: null,
	selectedNote: null,
	selectedNoteId: null,
	selectedDayNotes: null,
	selectedDay: null,
};
