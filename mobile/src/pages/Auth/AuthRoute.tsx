import React, { useEffect } from "react";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
	DrawerNavigationProp,
} from "@react-navigation/drawer";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import HomePage from "./HomePage/HomePage";
import LogOutPage from "./LogOutPage/LogOutPage";
import CreateNotePage from "./CreateNotePage/CreateNotePage";
import { AuthNavProps } from "../../api/types/AuthNavProps";
import { Icon } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { View } from "react-native";
import Header from "../../components/shared/Header";

interface labelProps {
	focused: boolean;
	color: string;
}

const CustomDrawerContent = (props) => {
	// console.log(props);
	return (
		<DrawerContentScrollView {...props} style={{ height: "100%" }}>
			{/* <DrawerItemList {...props} /> */}
			<Header />
			<DrawerItem
				style={[styles.drawerItem]}
				label={({ focused, color }: labelProps) => {
					console.log("homeFocused:", color);
					return (
						<View style={styles.drawerItemContainer}>
							<Icon name="ios-home" type="ionicon" color="white" />
							<Text style={styles.drawerItemText}>{focused ? "HOME" : "Home"}</Text>
						</View>
					);
				}}
				onPress={() => props.navigation.navigate("Home")}
			/>
			<DrawerItem
				style={[styles.drawerItem]}
				label={({ focused, color }: labelProps) => {
					console.log("createNote:", color);
					return (
						<View style={styles.drawerItemContainer}>
							<Icon name="md-add" type="ionicon" color="white" />
							<Text style={styles.drawerItemText}>{focused ? "CREATE NOTE" : "Create Note"}</Text>
						</View>
					);
				}}
				onPress={() => props.navigation.navigate("CreateNote")}
			/>
			<View style={styles.bottomLine}></View>
			<View style={styles.bottomAlign}>
				<DrawerItem
					style={[styles.drawerItem]}
					label={({ focused, color }: labelProps) => {
						console.log("signOut:", color);
						return (
							<View style={styles.drawerItemContainer}>
								<Icon name="ios-log-out" type="ionicon" color="white" />
								<Text style={styles.drawerItemText}>{focused ? "SIGN OUT" : "Sign out"}</Text>
							</View>
						);
					}}
					onPress={() => props.navigation.navigate("LogOut")}
				/>
			</View>
		</DrawerContentScrollView>
	);
};

const Drawer = createDrawerNavigator();

const AuthRoute: React.FC<AuthNavProps<"Auth">> = ({ navigation }) => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerStyle={{ backgroundColor: "#292F3D" }}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="Home" component={HomePage} />
			<Drawer.Screen name="CreateNote" component={CreateNotePage} />
			<Drawer.Screen name="LogOut" component={LogOutPage} />
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawerItem: {
		borderColor: "#7D92FF",
		borderWidth: 2,
		borderRadius: 15,
		marginBottom: 10,
	},
	drawerItemContainer: {
		paddingLeft: 15,
		flexDirection: "row",
	},
	drawerItemText: {
		color: "white",
		fontSize: 18,
		paddingLeft: 20,
	},
	bottomLine: {
		width: "100%",
		borderColor: "gray",
		borderWidth: 1,
		marginTop: 35,
		marginBottom: 35,
	},
	bottomAlign: {},
	alignItemBottom: {},
});

export default AuthRoute;
