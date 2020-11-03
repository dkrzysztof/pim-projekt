import { requests } from "../agent";
import { CreateNoteRequest, UpdateNoteRequest } from "./requests";
import { CreateNoteResponse, DeleteNoteResponse, GetAllNotesResponse, UpdateNoteResponse } from "./responses";

const NoteApi = {
	createNote: (body: CreateNoteRequest): Promise<CreateNoteResponse> => requests.post("Note", body),
	getAllNotes: (): Promise<GetAllNotesResponse> => requests.get("Note"),
	updateNote: (body: UpdateNoteRequest): Promise<UpdateNoteResponse> => requests.put("Note", body),
	deleteNote: (idNote: number): Promise<DeleteNoteResponse> => requests.delete(`Note/${idNote}`),
};

export default NoteApi;
