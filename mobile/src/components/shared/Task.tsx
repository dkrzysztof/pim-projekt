import * as React from "react";
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput, ImagePropTypes } from "react-native";
import { NoteForGetDailyNotesResponse } from "../../api/note/responses";

export interface Props {
	task: NoteForGetDailyNotesResponse;
	onPress: (noteId: number) => () => void;
}

const Task: React.FC<Props> = ({ task, onPress }) => {
	return (
		<TouchableOpacity style={styles.task} onPress={onPress(task.id)}>
			<View style={pickIcon(task.priorityId, false)} />
			<Text style={false ? styles.taskTextDone : styles.taskText}>{task.title}</Text>
		</TouchableOpacity>
	);
};

const pickIcon = (importance: Number, done: boolean) => {
	switch (importance) {
		case 1:
			if (done) {
				return styles.importantTaskIconDone;
			}
			return styles.importantTaskIcon;
		case 2:
			if (done) {
				return styles.mediumTaskIconDone;
			}
			return styles.mediumTaskIcon;
		case 3:
			if (done) {
				return styles.smallTaskIconDone;
			}
			return styles.smallTaskIcon;
	}
	return null;
};

const styles = StyleSheet.create({
	task: {
		width: "100%",
		paddingLeft: 60,
		paddingTop: 10,
		// backgroundColor: 'red',
		// justifyContent: 'flex-start',
		marginTop: 5,
		marginBottom: 5,
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
	},
	taskText: {
		fontWeight: "normal",
		fontSize: 18,
		paddingLeft: 10,
		color: "#ffffff",
		letterSpacing: 2,
		// textAlign: 'left',
	},
	taskTextDone: {
		fontWeight: "normal",
		fontSize: 18,
		paddingLeft: 10,
		color: "#666666",
		letterSpacing: 2,
		textDecorationLine: "line-through",
	},
	importantTaskIcon: {
		height: 15,
		width: 15,
		backgroundColor: "#EE5353",
		borderRadius: 2,
	},
	importantTaskIconDone: {
		height: 15,
		width: 15,
		borderWidth: 2,
		borderRadius: 2,
		borderColor: "#844646",
	},
	mediumTaskIcon: {
		height: 15,
		width: 15,
		backgroundColor: "#E88E3B",
		borderRadius: 2,
	},
	mediumTaskIconDone: {
		height: 15,
		width: 15,
		borderColor: "#9F7853",
		borderWidth: 2,
		borderRadius: 50,
	},
	smallTaskIcon: {
		height: 15,
		width: 15,
		backgroundColor: "#BFBFBF",
		borderRadius: 3,
	},
	smallTaskIconDone: {
		height: 15,
		width: 15,
		borderRadius: 3,
		borderColor: "#666666",
		borderWidth: 2,
	},
});

export default Task;
