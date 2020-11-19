import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../../components/shared/LoadingScreen";
import { getSelectedDateNotes, resetGetMonthlyNotes } from "../../../../state/notes/notes.slice";
import { getDailyNotes, getMonthlyNotes, getUserNotes } from "../../../../state/notes/notes.thunk";
import { RootState } from "../../../../state/root.reducer";
import { isStatusLoading, isStatusSuccess } from "../../../../state/utils/status.type";
import Tile from "../components/Tile";

interface CalendarDate {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}

interface MarkedDates {
	[key: string]: {
		selected?: boolean;
		marked?: boolean;
		dotColor?: string;
	};
}

function mapTasksToDots(notesDates: string[]) {
	const markedDates: MarkedDates = {};

	notesDates.forEach((day) => {
		markedDates[new Date(day).toLocaleDateString()] = { marked: true };
	});

	return markedDates;
}

const MonthlyContainer: React.FC<{}> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const notesDates = useSelector((state: RootState) => state.notes.notesMonthly);
	const selectedDay = useSelector((state: RootState) => state.notes.selectedDay);
	const getMonthlyNotesStatus = useSelector((state: RootState) => state.notes.status.getMonthlyNotes);
	const selectedDayNotes = useSelector((state: RootState) => state.notes.selectedDayNotes);

	// Zmapuj dostarczone daty na kropki w kalendarzu
	let markedDates: MarkedDates = {};
	if (notesDates) markedDates = mapTasksToDots(notesDates);

	const [selectedDate, setSelectedDate] = useState<MarkedDates>(markedDates);

	useEffect(() => {
		dispatch(getMonthlyNotes());
		dispatch(getDailyNotes());
		dispatch(getSelectedDateNotes(selectedDay || moment().format("YYYY-MM-DD")));
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			dispatch(getMonthlyNotes());
			dispatch(getSelectedDateNotes(selectedDay || moment().format("YYYY-MM-DD")));
			dispatch(getDailyNotes());
		}, [dispatch])
	);

	const handleDayPress = (date: CalendarDate) => {
		let newMarkedDate: MarkedDates = mapTasksToDots(notesDates || []);
		newMarkedDate[date.dateString] = {
			selected: true,
			marked: !!notesDates.find((x) => new Date(x).getTime() === new Date(date.dateString).getTime()) || false,
		};

		setSelectedDate(newMarkedDate);
		dispatch(getSelectedDateNotes(date.dateString));
	};

	if (isStatusSuccess(getMonthlyNotesStatus)) {
		markedDates = mapTasksToDots(notesDates || []);
		setSelectedDate(markedDates);
		dispatch(resetGetMonthlyNotes());
	}

	const handleNotesDetailsClick = (noteId: number) => {
		return () => {
			navigation.navigate("NoteDetails", { noteId });
		};
	};

	console.log("selectedDayNotes", selectedDayNotes);
	const DailyTileForTask =
		selectedDayNotes &&
		selectedDayNotes.map((daily, key) => (
			<Tile
				key={key}
				dueDate={daily.periodValue}
				granularity="days"
				notes={daily.notes}
				onPress={handleNotesDetailsClick}
			/>
		));
	return (
		<ScrollView style={styles.container}>
			<Calendar
				onDayPress={handleDayPress}
				enableSwipeMonths={true}
				markedDates={selectedDate}
				markingType={"dot"}
				style={styles.calendar}
				firstDay={1}
				theme={{
					backgroundColor: "#292F3D",
					calendarBackground: "#292F3D",
					textSectionTitleColor: "#ffffff",
					textSectionTitleDisabledColor: "#d9e1e8",
					selectedDayBackgroundColor: "#d9d9d9",
					selectedDayTextColor: "#292F3D",
					todayTextColor: "#00adf5",
					dayTextColor: "white",
					textDisabledColor: "#375062",
					dotColor: "#00adf5",
					selectedDotColor: "#36444a",
					arrowColor: "#7D92FF",
					disabledArrowColor: "#d9e1e8",
					monthTextColor: "white",
					indicatorColor: "red",
				}}
			/>
			{selectedDayNotes && selectedDayNotes.length > 0 && (
				<>
					<View style={styles.divider}></View>
					<View>{DailyTileForTask}</View>
				</>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
		height: "100%",
		width: "100%",
		paddingLeft: 10,
		paddingRight: 10,
	},
	calendar: {
		width: "100%",
		height: 370,
		borderWidth: 1,
		borderColor: "#7D92FF",
		borderRadius: 15,
	},
	divider: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15,
		marginBottom: 15,
		borderColor: "#525E7A",
		borderBottomWidth: 1,
		borderRadius: 15,
	},
});

export default MonthlyContainer;
