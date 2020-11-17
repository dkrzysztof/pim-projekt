import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PublicPage from "./pages/PublicPage/PublicPage";
import { useSelector } from "react-redux";
import { StyleSheet, Text } from "react-native";
import { RootState } from "./state/root.reducer";
import { isStatusLoading } from "./state/utils/status.type";
import Center from "./components/Center";
import AuthRoute from "./pages/Auth/AuthRoute";
import NoteDetailsContainer from "./pages/Auth/NoteDetailsPage/NoteDetailsContainer";

export type RouteParamList = {
	Public: undefined;
	Auth: {
		Home: {
			Daily: undefined;
			Monthly: undefined;
			Weekly: undefined;
		};
		LogOut: undefined;
		CreateNote: undefined;
	};
	NoteDetails: {
		noteId: number;
	};
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
			<Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Auth" component={AuthRoute} />
				<Stack.Screen name="NoteDetails" component={NoteDetailsContainer} />
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
