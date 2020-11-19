import React, { useEffect } from "react";
import { View, Text, Button, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DailyContainer from "./containers/DailyContainer";
import MonthlyContainer from "./containers/MonthlyContainer";
import WeeklyContainer from "./containers/WeeklyContainer";
import { AuthNavProps } from "../../../api/types/AuthNavProps";
import { useDispatch } from "react-redux";
import { getAllNotesSuccess } from "../../../state/notes/notes.slice";
import { getDailyNotes, getUserNotes, getWeeklyNotes } from "../../../state/notes/notes.thunk";
import FloatingButton from "../../../components/shared/FloatingButton";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Tab = createMaterialTopTabNavigator();

interface HomePageProps {
	navigation: DrawerNavigationProp<{ Home: undefined; CreateNote: undefined; LogOut: undefined }, "Home">;
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserNotes());
		dispatch(getDailyNotes());
		dispatch(getWeeklyNotes());
	}, []);

	return (
		<>
			<Tab.Navigator
				initialRouteName="Daily"
				tabBarOptions={{
					tabStyle: {
						paddingTop: 50,
						backgroundColor: "#292F3D",
					},
					activeTintColor: "white",
					inactiveTintColor: "gray",
				}}
			>
				<Tab.Screen name="Daily" component={DailyContainer} />
				<Tab.Screen name="Weekly" component={WeeklyContainer} />
				<Tab.Screen name="Monthly" component={MonthlyContainer} />
			</Tab.Navigator>
			<FloatingButton navigation={navigation} />
		</>
	);
};

export default HomePage;
