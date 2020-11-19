import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";

import ButtonTrans from "../../../components/shared/ButtonTrans";
import Header from "../../../components/shared/Header";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import { RouteParamList } from "../../../Routes";
import { deselectNote } from "../../../state/notes/notes.slice";
import { RootState } from "../../../state/root.reducer";
import { TextInput, TouchableNativeFeedback } from "react-native-gesture-handler";
import { DatePicker } from "native-base";
import { getNoteDetails, getUserNotes, updateUserNote } from "../../../state/notes/notes.thunk";
import { UpdateNoteRequest } from "../../../api/note/requests";
import moment from "moment";
import { Icon } from "react-native-elements";

interface EditNoteContainerProps {
	navigation: StackNavigationProp<RouteParamList, "NoteEdit">;
	route: {
		key: string;
		name: string;
		params: {
			noteId: number;
		};
	};
}

const EditNotePageContainer: React.FC<EditNoteContainerProps> = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { noteId } = route.params;
	const note = useSelector((state: RootState) => state.notes.notes?.find((note) => note.id === noteId));
	const [loadingText, setLoadingText] = useState<boolean>(false);
	const [newNote, setNewNote] = useState<UpdateNoteRequest>({
		NoteId: noteId,
		Content: note?.content,
		Title: note?.title,
		PriorityId: note?.priorityId,
		EventDate: note?.eventDate,
		NotificationDate: note?.notificationDate,
	});

	if (!note) return <LoadingScreen />;

	const eventDateValue = note.eventDate ? new Date(note.eventDate) : undefined;
	let notificationDateValue = note.notificationDate ? new Date(note.notificationDate) : undefined;
	const borderBottomColor = note.priorityId === 1 ? "#EE5353" : note.priorityId === 2 ? "#E88E3B" : "#BFBFBF";

	// handlers
	const handleTextInputChange = (key: string) => (value: string) => setNewNote((ps) => ({ ...ps, [key]: value }));

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView>
				<Text>EDIT </Text>
				<View style={styles.innerContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.titleContainer}>
							<TextInput style={styles.titleText} onChangeText={handleTextInputChange("Title")}>
								{note.title}
							</TextInput>
							<View style={{ ...styles.titleUnderline, borderBottomColor }} />
						</View>
						<View style={styles.dateContainer}>
							<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
								<DatePicker
									defaultDate={eventDateValue}
									minimumDate={new Date()}
									onDateChange={handleTextInputChange("EventDate")}
									textStyle={{ color: "white", paddingLeft: 0 }}
									placeHolderTextStyle={{ width: "100%" }}
								/>
							</View>
							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Event Date</Text>
						</View>
						<View style={styles.dateContainer}>
							<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
								<DatePicker
									onDateChange={handleTextInputChange("NotificationDate")}
									defaultDate={notificationDateValue}
									minimumDate={new Date()}
									textStyle={{ color: "white", paddingLeft: 0 }}
								/>
							</View>

							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Notification Date</Text>
						</View>
						<View style={styles.descriptionContainer}>
							<TextInput style={styles.descriptionText} onChangeText={handleTextInputChange("Content")}>
								{note.content}
							</TextInput>
							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Description</Text>
						</View>
					</View>

					<View style={styles.buttonsContainer}>
						<View style={styles.buttonsInnerContainer}>
							<ButtonTrans text="Cancel" type="cancel" onPress={() => navigation.goBack()} />
							<ButtonTrans
								text={loadingText ? "Saving..." : "Accept"}
								type="add"
								onPress={() => {
									const newNoteCopy = { ...newNote };

									if (newNote.EventDate && moment(newNote.EventDate, "DD/MM/YYYY").isValid())
										newNoteCopy.EventDate = moment(newNote.EventDate, "DD/MM/YYYY")
											.add(1, "days")
											.toISOString();

									if (newNote.EventDate && moment(newNote.NotificationDate, "DD/MM/YYYY").isValid())
										newNoteCopy.NotificationDate = moment(newNote.NotificationDate, "DD/MM/YYYY")
											.add(1, "days")
											.toISOString();

									console.log(newNoteCopy);
									setLoadingText(true);
									dispatch(
										updateUserNote(newNoteCopy, () => {
											dispatch(
												getUserNotes(() => {
													setLoadingText(false);
													dispatch(getNoteDetails(noteId, () => navigation.goBack()));
												})
											);
										})
									);
								}}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
		width: "100%",
		height: "100%",
		paddingTop: 25,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	innerContainer: {
		width: "75%",
		marginLeft: "auto",
		marginRight: "auto",
		height: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: 'red',
	},
	contentContainer: {
		width: "100%",
		justifyContent: "flex-start",
		marginBottom: 50,
		// backgroundColor: 'blue',
	},
	titleContainer: {
		width: "100%",
		justifyContent: "flex-start",
		marginVertical: 40,
	},
	titleUnderline: {
		width: "100%",
		borderBottomWidth: 3,
		borderRadius: 10,
	},
	thinUnderline: {
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: "#808080",
	},
	titleText: {
		paddingBottom: 3,
		fontWeight: "normal",
		fontSize: 18,
		color: "#ffffff",
		textAlign: "left",
	},
	dateContainer: {
		width: "100%",
		justifyContent: "flex-start",
		marginVertical: 10,
	},
	dateText: {
		paddingBottom: 3,
		fontWeight: "normal",
		fontSize: 16,
		color: "#A6A6A6",
		textAlign: "left",
	},
	infoText: {
		fontWeight: "normal",
		fontSize: 14,
		color: "#808080",
		textAlign: "left",
	},
	descriptionContainer: {
		width: "100%",
		justifyContent: "flex-start",
		marginTop: 30,
	},
	descriptionText: {
		fontWeight: "normal",
		fontSize: 16,
		color: "#ffffff",
		textAlign: "justify",
	},
	buttonsContainer: {
		width: "100%",
		height: 150,
		// backgroundColor: 'gray',
	},
	buttonsInnerContainer: {
		width: "100%",
		// height: 40,
		justifyContent: "space-between",
		flexDirection: "row",
		// backgroundColor: 'white',
	},
	editButton: {
		backgroundColor: "transparent",
		borderRadius: 15,
		borderWidth: 3,
		borderColor: "#7D92FF",
		borderStyle: "solid",
		fontSize: 20,
		paddingHorizontal: 28,
		paddingVertical: 10,
		fontWeight: "bold",
	},
});

export default EditNotePageContainer;
