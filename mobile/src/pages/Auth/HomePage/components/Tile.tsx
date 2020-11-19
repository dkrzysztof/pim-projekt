import * as React from "react";
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import Task from "../../../../components/shared/Task";
import { NoteForGetDailyNotesResponse } from "../../../../api/note/responses";
import moment from "moment";

export type Granulality = "days" | "weeks";

export interface Props {
	notes: NoteForGetDailyNotesResponse[];
	dueDate: string;
	onPress: (noteId: number) => () => void;
	presentationalDateString?: string;
	granularity: Granulality;
}

function generateDateStringForDays(date: moment.Moment): string {
	const today = moment();
	const startOfWeek = moment().subtract(1, "days").endOf("day");
	const endOfWeek = moment().add(6, "days").endOf("day");

	if (date.isSame(today, "day")) return "Today";

	if (date.isAfter(startOfWeek) && date.isBefore(endOfWeek)) return date.format("dddd");

	if (date.isValid()) return date.format("DD.MM.YYYY");
	else return "No Due";
}

const Tile: React.FC<Props> = ({ notes, dueDate, onPress, granularity, presentationalDateString }) => {
	let noteMomentDate = moment();
	let noteDate;
	let localeDateString;

	switch (granularity) {
		case "days":
			noteMomentDate = moment(dueDate, "DD.MM.YYYY");
			noteDate = generateDateStringForDays(noteMomentDate);
			localeDateString = noteMomentDate.format("DD.MM.YYYY");
			break;
		case "weeks":
			noteMomentDate = moment(dueDate);
			noteDate = presentationalDateString;
			localeDateString = presentationalDateString;
			break;
	}

	const isCurrent = noteMomentDate.diff(moment().subtract(1, "days")) > 0;

	return (
		<View
			style={[
				styles.noteContainer,
				// noteMomentDate.isValid() ? null : { borderColor: "#7D92FF" },
				isCurrent ? styles.noteContainerAfterOrToday : styles.noteContainerBeforeToday,
			]}
		>
			<View style={styles.noteHeaderContainer}>
				<Text style={styles.headerText}>{noteDate}</Text>
				{noteMomentDate.isValid() ? <Text style={styles.headerDate}>{localeDateString}</Text> : null}
			</View>
			<View style={styles.underline} />

			{notes.map((note, key) => (
				<Task key={key} task={note} onPress={onPress} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	noteContainer: {
		width: "100%",
		paddingBottom: 20,
		marginBottom: 15,
		borderRadius: 15,
		borderColor: "transparent",
		borderWidth: 2,
		color: "white",
		justifyContent: "center",
		alignItems: "flex-start",
		shadowOpacity: 1,
		shadowRadius: 20,
		shadowColor: "red",
	},
	noteContainerBeforeToday: {
		backgroundColor: "#242323",
	},
	noteContainerAfterOrToday: {
		backgroundColor: "#1B1F28",
	},
	noteHeaderContainer: {
		width: "100%",
		paddingHorizontal: 20,
		paddingTop: 10,
		// backgroundColor: 'red',
		justifyContent: "space-between",
		// display: 'flex',
		flexDirection: "row",
	},
	headerText: {
		fontWeight: "normal",
		fontSize: 20,
		color: "#ffffff",
		letterSpacing: 2,
		textAlign: "left",
	},
	headerDate: {
		fontWeight: "normal",
		paddingBottom: 2,
		fontSize: 12,
		color: "#5E6575",
		letterSpacing: 2,
		textAlign: "left",
		textAlignVertical: "bottom",
	},
	underline: {
		width: "90%",
		alignSelf: "center",
		// marginBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#808080",
	},
});

export default Tile;
