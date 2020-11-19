export interface UpdateNoteRequest {
	NoteId: number;
	Title?: string;
	Content?: string;
	PriorityId?: number;
	EventDate?: string | undefined;
	NotificationDate?: string | undefined;
}
