import { requests } from "../agent";
import { CreateNoteRequest, UpdateNoteRequest } from "./requests";
import {
	CreateNoteResponse,
	DeleteNoteResponse,
	GetAllNotesResponse,
	GetDailyNotesResponse,
	GetNoteDetails,
	GetWeeklyNotesResponse,
	UpdateNoteResponse,
} from "./responses";

const NoteApi = {
	createNote: (body: CreateNoteRequest): Promise<CreateNoteResponse> => requests.post("Note", body),

	getAllNotes: (): Promise<GetAllNotesResponse> => requests.get("Note"),
	getDailyNotes: (): Promise<GetDailyNotesResponse> => requests.get("Note/sorted/0"),
	getWeeklyNotes: (): Promise<GetWeeklyNotesResponse> => requests.get("Note/sorted/1"),

	updateNote: (body: UpdateNoteRequest): Promise<UpdateNoteResponse> => requests.put("Note", body),
	deleteNote: (idNote: number): Promise<DeleteNoteResponse> => requests.delete(`Note/${idNote}`),
	getNoteDetails: (idNote: Number): Promise<GetNoteDetails> => requests.get(`Note/${idNote}`),
};

export default NoteApi;
