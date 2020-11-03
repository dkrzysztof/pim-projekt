import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { devalidateSession } from "../../../../state/session/session.slice";

const DailyView: React.FC<{}> = () => {
	const dispatch = useDispatch();
	return (
		<View>
			<Text>Home Auth Page</Text>

			<Button title="Wyloguj" onPress={() => dispatch(devalidateSession())} />
		</View>
	);
};

export default DailyView;
