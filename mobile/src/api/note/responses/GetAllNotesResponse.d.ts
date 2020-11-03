export interface GetAllNotesResponse {
	notesResponses: NoteForGetAllNotesResponse[];
}

interface NoteForGetAllNotesResponse {
	id: number;
	title: string;
	content: string;
	notificationDate: null;
	eventDate: null;
	priorityName: string;
	priorityId: number;
}
