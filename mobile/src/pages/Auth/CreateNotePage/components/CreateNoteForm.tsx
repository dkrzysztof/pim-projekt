import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import { DatePicker, Picker } from "native-base";
import React, { useState } from "react";
import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { CreateNoteRequest } from "../../../../api/note/requests";
import ButtonTrans from "../../../../components/shared/ButtonTrans";
import { createUserNote, getUserNotes } from "../../../../state/notes/notes.thunk";

interface CreateNoteFormProps {
	onPress?: () => void;
	navigation: DrawerNavigationProp<{ Home: undefined; CreateNote: undefined; LogOut: undefined }, "CreateNote">;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ navigation }) => {
	const [note, setNote] = useState<CreateNoteRequest>({
		Content: undefined,
		PriorityId: 1,
		Title: undefined,
	});
	const dispatch = useDispatch();

	const handleButtonPress = () => {
		const EventDate = note.EventDate ? moment(note.EventDate).add(1, "days").toISOString() : undefined;
		const navigateHome = () => navigation.navigate("Home");
		const dispatchGetUserNotes = () => dispatch(getUserNotes(navigateHome));
		dispatch(createUserNote({ ...note, EventDate }, dispatchGetUserNotes));
	};

	return (
		<View style={styles.formulageContainer}>
			<View style={styles.headerTextContainer}>
				<Text style={styles.headerText}>{"Add new\nNote"}</Text>
			</View>
			<View style={styles.underline} />
			<TextInput
				value={note?.Title}
				onChangeText={(Title) => setNote((ps) => ({ ...ps, Title }))}
				placeholder="Note title"
				placeholderTextColor="#CCCCCC"
				style={styles.textInput}
			></TextInput>
			<Picker
				note
				mode="dropdown"
				placeholder="Choose priority..."
				selectedValue={note.PriorityId}
				onValueChange={(PriorityId) => setNote((ps) => ({ ...ps, PriorityId }))}
				style={styles.textInput}
				textStyle={{ borderWidth: 2, borderColor: "white" }}
				itemStyle={{ borderWidth: 2, borderColor: "red" }}
			>
				<Picker.Item label="Most imporant" value={1} />
				<Picker.Item label="Moderate" value={2} />
				<Picker.Item label="Least" value={3} />
			</Picker>
			<DatePicker
				minimumDate={new Date()}
				onDateChange={(EventDate) =>
					setNote((ps) => ({
						...ps,
						EventDate: moment(EventDate).toISOString(),
					}))
				}
				modalTransparent={false}
				animationType={"fade"}
				androidMode={"default"}
				timeZoneOffsetInMinutes={24 * 60}
				locale={"pl"}
				textStyle={styles.textInputDashed}
				placeHolderTextStyle={{ ...styles.textInputDashed, color: "gray" }}
				placeHolderText="Event date..."
			/>
			<DatePicker
				minimumDate={new Date()}
				onDateChange={(NotificationDate) =>
					setNote((ps) => ({
						...ps,
						NotificationDate: moment(NotificationDate).toISOString(),
					}))
				}
				modalTransparent={false}
				animationType={"fade"}
				androidMode={"default"}
				timeZoneOffsetInMinutes={24 * 60}
				locale={"pl"}
				textStyle={styles.textInputDashed}
				placeHolderTextStyle={{ ...styles.textInputDashed, color: "gray", paddingTop: 15 }}
				placeHolderText="Notification date..."
			/>
			<TextInput
				onChangeText={(Content) => setNote((ps) => ({ ...ps, Content }))}
				value={note?.Content}
				placeholder="Description..."
				placeholderTextColor="#CCCCCC"
				style={styles.textInputDesc}
				multiline={true}
			></TextInput>
			<View style={styles.buttonsContainer}>
				<ButtonTrans text={"Cancel"} type={"cancel"} onPress={() => navigation.navigate("Home")}></ButtonTrans>
				<ButtonTrans text={"Add !"} type={"add"} onPress={handleButtonPress}></ButtonTrans>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formulageContainer: {
		width: "90%",
		// borderRadius: 15,
		// borderColor: "#7D92FF",
		// borderWidth: 2,
		color: "white",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	headerTextContainer: {
		marginTop: 0,
		paddingTop: 0,
		marginBottom: 45,
	},
	buttonsContainer: {
		width: 350,
		// paddingHorizontal:10,
		paddingBottom: 10,
		// height: 40,
		// margin: 10,
		justifyContent: "space-between",
		flexDirection: "row",
		// backgroundColor: 'white',
	},
	headerText: {
		paddingBottom: 20,
		fontWeight: "normal",
		fontSize: 28,
		color: "#ffffff",
		letterSpacing: 4,
		textAlign: "center",
		textAlignVertical: "center",
	},
	underline: {
		width: "102%",
		marginBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#525E7A",
	},
	textInput: {
		borderRadius: 15,
		borderColor: "white",
		borderWidth: 2,
		color: "white",
		paddingLeft: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 15,
		margin: "auto",
		textAlignVertical: "center",
	},
	textInputDashed: {
		borderRadius: 15,
		borderColor: "white",
		borderWidth: 2,
		color: "white",
		paddingLeft: 15,
		paddingTop: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 15,
		margin: "auto",
		borderStyle: "dashed",
	},
	textInputDesc: {
		borderRadius: 15,
		borderColor: "white",
		borderWidth: 2,
		color: "white",
		paddingLeft: 15,
		paddingTop: 10,
		fontSize: 18,
		width: 350,
		height: 150,
		marginBottom: 15,
		margin: "auto",
		textAlignVertical: "top",
		flexWrap: "wrap",
	},
});

export default CreateNoteForm;
