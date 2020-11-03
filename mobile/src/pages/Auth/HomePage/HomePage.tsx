import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DailyView from "./components/DailyView";
import MonthlyView from "./components/MonthlyView";
import WeeklyView from "./components/WeeklyView";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const HomePage: React.FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={{ marginTop: 25 }}>
			<Tab.Navigator>
				<Tab.Screen name="Daily" component={DailyView} />
				<Tab.Screen name="Weekly" component={WeeklyView} />
				<Tab.Screen name="Monthly" component={MonthlyView} />
			</Tab.Navigator>
		</SafeAreaView>
	);
};

export default HomePage;
