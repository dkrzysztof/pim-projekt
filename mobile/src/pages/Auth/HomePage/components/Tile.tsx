import * as React from "react";
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import Task from "../../../../components/shared/Task";
import { NoteForGetDailyNotesResponse } from "../../../../api/note/responses";
import moment from "moment";

export interface Props {
	notes: NoteForGetDailyNotesResponse[];
	dueDate: string;
	onPress: (noteId: number) => () => void;
}

const Tile: React.FC<Props> = ({ notes, dueDate, onPress }) => {
	let today = moment();
	let noteDate = moment(dueDate, "DD.MM.YYYY");

	let stringDate = dueDate;
	if (
		noteDate.isAfter(today.subtract(1, "days").endOf("day")) &&
		noteDate.isBefore(today.add(7, "days").endOf("day"))
	) {
		stringDate = noteDate.format("dddd");
	}

	return (
		<View style={[styles.noteContainer, dueDate ? null : { borderColor: "#7D92FF" }]}>
			<View style={styles.noteHeaderContainer}>
				<Text style={styles.headerText}>{stringDate}</Text>
				{dueDate ? <Text style={styles.headerDate}>{}</Text> : null}
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
		backgroundColor: "#1B1F28",
		alignItems: "flex-start",
		shadowOpacity: 1,
		shadowRadius: 20,
		shadowColor: "red",
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
