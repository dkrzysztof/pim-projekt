import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch } from "react-redux";

import Top from "../../../../components/Top";

const MonthlyContainer: React.FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const handleDayPress = () => {
		// dispatch()
	};

	return (
		<View style={styles.container}>
			<Calendar onDayPress={handleDayPress} enableSwipeMonths={true} style={styles.calendar} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
		height: "100%",
		width: "100%",
	},
	calendar: {
		width: "100%",
		height: 350,
	},
});

export default MonthlyContainer;
