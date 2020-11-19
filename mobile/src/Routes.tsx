import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PublicPage from "./pages/PublicPage/PublicPage";
import { useSelector } from "react-redux";
import { RootState } from "./state/root.reducer";
import { isStatusLoading } from "./state/utils/status.type";
import AuthRoute from "./pages/Auth/AuthRoute";
import NoteDetailsContainer from "./pages/Auth/NoteDetailsPage/NoteDetailsContainer";
import LoadingScreen from "./components/shared/LoadingScreen";
import EditNotePageContainer from "./pages/Auth/EditNotePage/EditNotePageContainer";

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
	NoteEdit: {
		noteId: number;
	};
};

const Stack = createStackNavigator<RouteParamList>();

const Routes: React.FC<{}> = () => {
	const isUserLoggedIn = useSelector((state: RootState) => !!state.session.info.token);
	const authenticateUserStatus = useSelector((state: RootState) => state.session.status.authenticateUser);

	if (isStatusLoading(authenticateUserStatus)) {
		return <LoadingScreen />;
	}

	if (isUserLoggedIn) {
		return (
			<Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Auth" component={AuthRoute} />
				<Stack.Screen name="NoteDetails" component={NoteDetailsContainer} />
				<Stack.Screen name="NoteEdit" component={EditNotePageContainer} />
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
