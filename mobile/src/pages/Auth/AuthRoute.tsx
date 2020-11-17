import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./HomePage/HomePage";
import LogOutPage from "./LogOutPage/LogOutPage";
import CreateNotePage from "./CreateNotePage/CreateNotePage";
import NoteDetailsContainer from "./NoteDetailsPage/NoteDetailsContainer";
import { AuthNavProps } from "../../api/types/AuthNavProps";
import { useDispatch } from "react-redux";

const Drawer = createDrawerNavigator();

const AuthRoute: React.FC<AuthNavProps<"Auth">> = ({ navigation }) => {
	const dispatch = useDispatch();
	useEffect(() => {}, []);
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={HomePage} />
			<Drawer.Screen name="CreateNote" component={CreateNotePage} />
			<Drawer.Screen name="LogOut" component={LogOutPage} />
		</Drawer.Navigator>
	);
};

export default AuthRoute;
