export interface GetDailyNotesResponse {
	sortedNotesResponses: DayForGetDailyNotesResponse[];
}

export interface DayForGetDailyNotesResponse {
	periodValue: string;
	notes: NoteForGetDailyNotesResponse[];
}

export interface NoteForGetDailyNotesResponse {
	id: number;
	title: string;
	priorityId: number;
	done: boolean;
}
