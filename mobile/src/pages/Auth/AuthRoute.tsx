import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./HomePage/HomePage";
import CreateNotePage from "./CreateNotePage/CreateNotePage";
import LogOutPage from "./LogOutPage/LogOutPage";

const Drawer = createDrawerNavigator();

const AuthRoute: React.FC<{}> = () => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={HomePage} />
			<Drawer.Screen name="CreateNote" component={CreateNotePage} />
			<Drawer.Screen name="LogOut" component={LogOutPage} />
		</Drawer.Navigator>
	);
};

export default AuthRoute;
