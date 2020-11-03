import { requests } from "../agent";
import { CreateNoteRequest, UpdateNoteRequest } from "./requests";
import {
	CreateNoteResponse,
	DeleteNoteResponse,
	GetAllNotesResponse,
	GetNoteDetails,
	UpdateNoteResponse,
} from "./responses";

const NoteApi = {
	createNote: (body: CreateNoteRequest): Promise<CreateNoteResponse> => requests.post("Note", body),
	getAllNotes: (): Promise<GetAllNotesResponse> => requests.get("Note"),
	updateNote: (body: UpdateNoteRequest): Promise<UpdateNoteResponse> => requests.put("Note", body),
	deleteNote: (idNote: number): Promise<DeleteNoteResponse> => requests.delete(`Note/${idNote}`),
	getNoteDetails: (idNote: Number): Promise<GetNoteDetails> => requests.get(`Note/${idNote}`),
};

export default NoteApi;
