import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import { Toast } from "native-base";
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ButtonTrans from "../../../components/shared/ButtonTrans";
import Header from "../../../components/shared/Header";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import { RouteParamList } from "../../../Routes";
import { deselectNote, getSelectedDateNotes } from "../../../state/notes/notes.slice";
import { deleteUserNote, getDailyNotes, getMonthlyNotes, getNoteDetails } from "../../../state/notes/notes.thunk";
import { RootState } from "../../../state/root.reducer";
import { isStatusLoading, isStatusSuccess } from "../../../state/utils/status.type";

interface NoteDetailsContainerProps {
	navigation: StackNavigationProp<RouteParamList, "NoteDetails">;
	route: {
		key: string;
		name: string;
		params: {
			noteId: number;
		};
	};
}

const NoteDetailsContainer: React.FC<NoteDetailsContainerProps> = ({ navigation, route }) => {
	const idNote = route.params.noteId;
	const note = useSelector((state: RootState) => state.notes.selectedNote);
	const deleteNoteStatus = useSelector((state: RootState) => state.notes.status.deleteNote);
	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			dispatch(getNoteDetails(idNote));
		}, [dispatch, idNote])
	);
	if (!note || isStatusLoading(deleteNoteStatus)) return <LoadingScreen />;

	const eventDateString = note.eventDate ? moment(note.eventDate).format("DD.MM.YYYY") : "No Due";
	const notificationDateString = note.notificationDate
		? moment(note.notificationDate).format("DD.MM.YYYY")
		: "No Notification";
	const borderBottomColor = note.priorityId === 1 ? "#EE5353" : note.priorityId === 2 ? "#E88E3B" : "#BFBFBF";

	const handleDelete = () => {
		dispatch(
			deleteUserNote(idNote, () => {
				dispatch(getDailyNotes(() => dispatch(getMonthlyNotes(() => dispatch(deselectNote())))));
				// Toast.show({
				// 	text: "Note was deleted!",
				// 	buttonText: "Okay",
				// 	type: "success",
				// });
			})
		);
	};

	if (isStatusSuccess(deleteNoteStatus)) navigation.goBack();

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView>
				<View style={styles.innerContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.titleContainer}>
							<Text style={styles.titleText}>{note.title}</Text>
							<View style={{ ...styles.titleUnderline, borderBottomColor }} />
						</View>
						<View style={styles.dateContainer}>
							<Text style={styles.dateText}>{eventDateString || "No event date !"}</Text>
							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Event Date</Text>
						</View>
						<View style={styles.dateContainer}>
							<Text style={styles.dateText}>{notificationDateString || "No Notification date !"}</Text>
							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Notification Date</Text>
						</View>
						<View style={styles.descriptionContainer}>
							<Text style={styles.descriptionText}>{note.content}</Text>
							<View style={styles.thinUnderline} />
							<Text style={styles.infoText}>Description</Text>
						</View>
					</View>

					<View style={styles.buttonsContainer}>
						<View style={styles.buttonsInnerContainer}>
							<ButtonTrans
								text={"Edit"}
								type={"edit"}
								onPress={() => {
									navigation.navigate("NoteEdit", { noteId: idNote });
								}}
							/>
							<ButtonTrans
								text={"Delete"}
								type={"delete"}
								onPress={() =>
									Alert.alert(
										`Delete Note ${note.title}`,
										"Are you sure you want to delete this note ?",
										[
											{
												text: "Cancel",
												onPress: () => {},
												style: "cancel",
											},
											{
												text: "OK",
												onPress: handleDelete,
											},
										],
										{ cancelable: false }
									)
								}
							/>
						</View>
						<ButtonTrans
							text={"Go back"}
							type={"back"}
							onPress={() => {
								dispatch(deselectNote());
								navigation.goBack();
							}}
						/>
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

export default NoteDetailsContainer;
