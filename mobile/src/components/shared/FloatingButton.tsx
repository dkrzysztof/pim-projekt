import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";

interface Drawer {
	Home: undefined;
	CreateNote: undefined;
	LogOut: undefined;
}

interface FloatingButtonProps<T extends keyof Drawer> {
	navigation: DrawerNavigationProp<{ Home: undefined; CreateNote: undefined; LogOut: undefined }, T>;
}
const FloatingButton: React.FC<FloatingButtonProps<"CreateNote" | "Home" | "LogOut">> = ({ navigation }) => {
	const handleToggleDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<TouchableHighlight
			style={{
				position: "absolute",
				bottom: 25,
				right: 25,
				width: 50,
				height: 50,
				backgroundColor: "#414858",
				borderRadius: 150,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				borderColor: "white",
				borderWidth: 2,
			}}
			onPress={handleToggleDrawer}
		>
			<Text>
				<Icon name="ios-menu" type="ionicon" size={32} color="white" />
			</Text>
		</TouchableHighlight>
	);
};

export default FloatingButton;
