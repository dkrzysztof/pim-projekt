import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { devalidateSession } from "../../../state/session/session.slice";

const DailyPage: React.FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={{ marginTop: 25 }}>
			<Text>Home Auth Page</Text>
			<Button title="Wyloguj" onPress={() => dispatch(devalidateSession())} />
		</SafeAreaView>
	);
};

export default DailyPage;
