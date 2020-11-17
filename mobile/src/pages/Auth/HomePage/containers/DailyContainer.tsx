import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/shared/Header";
import { getDailyNotes, getUserNotes } from "../../../../state/notes/notes.thunk";
import { RootState } from "../../../../state/root.reducer";
import Tile from "../components/Tile";

interface DailyContainerProps {
	navigation: StackNavigationProp<
		{
			Daily: undefined;
			Weekly: undefined;
			Monthly: undefined;
		},
		"Daily"
	>;
}

const DailyContainer: React.FC<DailyContainerProps> = ({}) => {
	const dispatch = useDispatch();
	const dailyNotes = useSelector((state: RootState) => state.notes.notesDaily);
	const navigation = useNavigation();

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		dispatch(
			getDailyNotes(
				() => setRefreshing(false),
				() => setRefreshing(false)
			)
		);
	}, []);

	useEffect(() => {
		dispatch(getDailyNotes());
	}, [dispatch]);

	const handleNotesDetailsClick = (noteId: number) => {
		return () => {
			navigation.navigate("NoteDetails", { noteId });
		};
	};

	const notesComponent =
		dailyNotes &&
		dailyNotes.map((daily, key) => (
			<Tile key={key} notes={daily.notes} dueDate={daily.periodValue} onPress={handleNotesDetailsClick} />
		));

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				{/* <ScrollView> */}
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

export default DailyContainer;
