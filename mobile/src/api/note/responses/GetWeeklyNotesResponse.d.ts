export interface GetWeeklyNotesResponse {
	sortedNotesResponses: WeekForGetWeeklyNotesResponse[];
}

export interface WeekForGetWeeklyNotesResponse {
	periodEnd: string;
	periodValue: string;
	notes: NoteForGetWeeklyNotesResponse[];
}

export interface NoteForGetWeeklyNotesResponse {
	id: number;
	title: string;
	priorityId: number;
	done: boolean;
}
