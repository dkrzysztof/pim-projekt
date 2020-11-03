import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PublicPage from "./pages/PublicPage/PublicPage";
import HomePage from "./pages/Auth/HomePage/HomePage";
import { useSelector } from "react-redux";
import { StyleSheet, Text } from "react-native";
import { RootState } from "./state/root.reducer";
import { isStatusLoading } from "./state/utils/status.type";
import Center from "./components/Center";

export type RouteParamList = {
	Public: undefined;
	Home: undefined;
};

const styles = StyleSheet.create({
	background: {
		color: "white",
		backgroundColor: "#292F3D",
	},
	text: {
		color: "white",
		fontSize: 20,
	},
});

const Stack = createStackNavigator<RouteParamList>();

const Routes: React.FC<{}> = () => {
	const isUserLoggedIn = useSelector((state: RootState) => !!state.session.info.token);
	const authenticateUserStatus = useSelector((state: RootState) => state.session.status.authenticateUser);

	if (isStatusLoading(authenticateUserStatus)) {
		console.log("Splash screen set up!");
		return (
			<Center>
				<Text style={styles.text}>Loading...</Text>
			</Center>
		);
	}

	if (isUserLoggedIn) {
		return (
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomePage} />
			</Stack.Navigator>
		);
	} else {
		return (
			<Stack.Navigator initialRouteName="Public" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Public" component={PublicPage} />
			</Stack.Navigator>
		);
	}
};

export default Routes;
