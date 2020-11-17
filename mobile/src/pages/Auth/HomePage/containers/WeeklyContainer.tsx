import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/shared/Header";
import { getDailyNotes, getWeeklyNotes } from "../../../../state/notes/notes.thunk";
import { RootState } from "../../../../state/root.reducer";
import Tile from "../components/Tile";

interface WeeklyContainerProps {
	navigation: any;
}
const WeeklyContainer: React.FC<WeeklyContainerProps> = ({ navigation }) => {
	const dispatch = useDispatch();
	const weeklyNotes = useSelector((state: RootState) => state.notes.notesWeekly);
	const navigationHook = useNavigation();

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		dispatch(
			getWeeklyNotes(
				() => setRefreshing(false),
				() => setRefreshing(false)
			)
		);
	}, []);

	useEffect(() => {
		dispatch(getDailyNotes());
	}, [navigation]);

	const handleNotesDetailsClick = (noteId: number) => {
		return () => {
			navigationHook.navigate("NoteDetails", { noteId });
		};
	};

	const notesComponent =
		weeklyNotes &&
		weeklyNotes.map((daily, key) => (
			<Tile key={key} notes={daily.notes} dueDate={daily.periodValue} onPress={handleNotesDetailsClick} />
		));

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<Header />
				<View style={styles.notesContainer}>{notesComponent}</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
		height: "100%",
	},
	notesContainer: {
		marginLeft: 10,
		marginRight: 10,
	},
});

export default WeeklyContainer;
