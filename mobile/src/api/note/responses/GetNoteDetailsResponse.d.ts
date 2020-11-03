export interface GetNoteDetails {
	id: number;
	title: string;
	content: string;
	notificationDate: Date;
	eventDate: Date;
	priorityName: string;
	priorityId: number;
}
