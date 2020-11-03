import React from "react";
import { View, Text, Button, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DailyView from "./components/DailyView";
import MonthlyView from "./components/MonthlyView";
import WeeklyView from "./components/WeeklyView";

const Tab = createMaterialTopTabNavigator();

const HomePage: React.FC<{}> = () => {
	return (
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
			<Tab.Screen name="Daily" component={DailyView} />
			<Tab.Screen name="Weekly" component={WeeklyView} />
			<Tab.Screen name="Monthly" component={MonthlyView} />
		</Tab.Navigator>
	);
};

export default HomePage;
