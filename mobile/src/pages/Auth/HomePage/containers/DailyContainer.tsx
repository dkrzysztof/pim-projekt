import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/shared/Header";
import { getUserNotes } from "../../../../state/notes/notes.thunk";
import { RootState } from "../../../../state/root.reducer";
import Note from "../components/Note";

const testNotes = [
	{
		title: "No Due",
		// date:'21.12.2020r.',
		tasks: [
			{ title: "Important Task 1", importance: 1, done: true },
			{ title: "Important Task 2", importance: 2, done: false },
			{ title: "Important Task 3", importance: 3, done: true },
			{ title: "Important Task 4", importance: 1, done: false },
		],
	},
	{
		title: "Tuesday",
		date: "21.12.2020r.",
		tasks: [
			{ title: "Important Task 1", importance: 1, done: false },
			{ title: "Important Task 2", importance: 2, done: true },
			{ title: "Important Task 3", importance: 3, done: false },
			{ title: "Important Task 4", importance: 1, done: true },
		],
	},
	{
		title: "Wednesday",
		date: "22.12.2020r.",
		tasks: [
			{ title: "Important Task 1", importance: 1, done: true },
			{ title: "Task 2", importance: 2, done: false },
			{ title: "Task 3", importance: 3, done: false },
			{ title: "Important Task 4", importance: 1, done: false },
			{ title: "Task 5", importance: 3, done: true },
			{ title: "Task 6", importance: 1, done: false },
		],
	},
	{
		title: "Thursday",
		date: "22.12.2020r.",
		tasks: [
			{ title: "Important Task 1", importance: 1, done: true },
			{ title: "Task 2", importance: 2, done: false },
			{ title: "Task 3", importance: 3, done: false },
			{ title: "Important Task 4", importance: 1, done: false },
			{ title: "Task 5", importance: 3, done: true },
			{ title: "Task 6", importance: 1, done: false },
		],
	},
];

interface DailyContainerProps {}

const DailyContainer: React.FC<DailyContainerProps> = () => {
	const dispatch = useDispatch();
	const notes = useSelector((state: RootState) => state.notes.notes);

	useEffect(() => {
		dispatch(getUserNotes());
	}, [dispatch]);

	// notes?.map( val => ({date: val.val.}))

	// const notesComponent = notes && notes.map((note, key) => <Note key={key}notes={note} />);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Header />
				<View style={styles.notesContainer}></View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
	},
	notesContainer: {
		marginLeft: 10,
		marginRight: 10,
	},
});

export default DailyContainer;
