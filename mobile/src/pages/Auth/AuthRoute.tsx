import React, { useEffect } from "react";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
	DrawerNavigationProp,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import HomePage from "./HomePage/HomePage";
import LogOutPage from "./LogOutPage/LogOutPage";
import CreateNotePage from "./CreateNotePage/CreateNotePage";
import { AuthNavProps } from "../../api/types/AuthNavProps";

interface labelProps {
	focused: boolean;
	color: string;
}

const CustomDrawerContent = (props) => {
	console.log(props);
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			{/* <DrawerItem
				label={({ focused }: labelProps) => <Text>{focused ? "HOME" : "home"}</Text>}
				onPress={() => props.navigation.navigate("Home")}
			/>
			<DrawerItem
				label={({ focused }: labelProps) => <Text>{focused ? "CREATE NOTE" : "create note"}</Text>}
				onPress={() => props.navigation.navigate("CreateNote")}
			/>
			<DrawerItem
				label={({ focused }: labelProps) => <Text>{focused ? "LOG OUT" : "log out"}</Text>}
				onPress={() => props.navigation.navigate("LogOut")}
			/> */}
		</DrawerContentScrollView>
	);
};

const Drawer = createDrawerNavigator();

const AuthRoute: React.FC<AuthNavProps<"Auth">> = ({ navigation }) => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerStyle={{ backgroundColor: "#292F3D" }}
			// drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="Home" component={HomePage} />
			<Drawer.Screen name="CreateNote" component={CreateNotePage} />
			<Drawer.Screen name="LogOut" component={LogOutPage} />
		</Drawer.Navigator>
	);
};

export default AuthRoute;
