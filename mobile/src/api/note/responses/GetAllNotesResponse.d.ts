export interface GetAllNotesResponse {
	notesResponses: NoteForGetAllNotesResponse[];
}

interface NoteForGetAllNotesResponse {
	id: number;
	title: string;
	content: string;
	notificationDate: string;
	eventDate: string;
	priorityName: string;
	priorityId: number;
}
