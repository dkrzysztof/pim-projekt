import React from "react";
import { View, Text, Button, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DailyContainer from "./containers/DailyContainer";
import MonthlyContainer from "./containers/MonthlyContainer";
import WeeklyContainer from "./containers/WeeklyContainer";

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
			<Tab.Screen name="Daily" component={DailyContainer} />
			<Tab.Screen name="Weekly" component={WeeklyContainer} />
			<Tab.Screen name="Monthly" component={MonthlyContainer} />
		</Tab.Navigator>
	);
};

export default HomePage;
