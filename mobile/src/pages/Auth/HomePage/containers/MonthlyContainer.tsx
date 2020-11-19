import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch } from "react-redux";

import Top from "../../../../components/Top";
import { getSelectedDateNotes } from "../../../../state/notes/notes.slice";

interface CalendarDate {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}

const MonthlyContainer: React.FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const handleDayPress = (date: CalendarDate) => {
		// console.log(e);
		dispatch(getSelectedDateNotes(date.dateString));
	};

	return (
		<ScrollView style={styles.container}>
			<Calendar
				onDayPress={handleDayPress}
				enableSwipeMonths={true}
				style={styles.calendar}
				firstDay={1}
				theme={{
					backgroundColor: "#292F3D",
					calendarBackground: "#292F3D",
					textSectionTitleColor: "#ffffff",
					textSectionTitleDisabledColor: "#d9e1e8",
					selectedDayBackgroundColor: "#ffffff",
					selectedDayTextColor: "#ffffff",
					todayTextColor: "#00adf5",
					dayTextColor: "white",
					textDisabledColor: "#375062",
					dotColor: "#00adf5",
					selectedDotColor: "#ffffff",
					arrowColor: "#7D92FF",
					disabledArrowColor: "#d9e1e8",
					monthTextColor: "white",
					indicatorColor: "red",
					// textDayFontFamily: "monospace",
					// textMonthFontFamily: "monospace",
					// textDayHeaderFontFamily: "monospace",
					// textDayFontWeight: "300",
					// textMonthFontWeight: "bold",
					// textDayHeaderFontWeight: "300",
					// textDayFontSize: 16,
					// textMonthFontSize: 16,
					// textDayHeaderFontSize: 16,
				}}
			/>
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
		height: 360,
		borderWidth: 1,
		borderColor: "#7D92FF",
		borderRadius: 15,
	},
});

export default MonthlyContainer;
