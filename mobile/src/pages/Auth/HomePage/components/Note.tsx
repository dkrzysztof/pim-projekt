import * as React from "react";
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ButtonTrans from "../../../../components/shared/ButtonTrans";
import Task from "../../../../components/shared/Task";
import { NoteForGetAllNotesResponse } from "../../../../api/note/responses/GetAllNotesResponse";

export interface Props {
	note: NoteForGetAllNotesResponse;
}

const Note: React.FC<Props> = ({ note }) => {
	return (
		<View style={[styles.noteContainer, note.eventDate ? null : { borderColor: "#7D92FF" }]}>
			<View style={styles.noteHeaderContainer}>
				<Text style={styles.headerText}>{note.title}</Text>
				{note.eventDate ? <Text style={styles.headerDate}>{note.eventDate}</Text> : null}
			</View>
			<View style={styles.underline} />
			{/* 
			{note.map((task, key) => (
				<Task key={key} task={task} />
			))} */}
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

export default Note;
