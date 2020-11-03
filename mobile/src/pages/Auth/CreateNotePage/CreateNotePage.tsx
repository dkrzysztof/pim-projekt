import React from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";
import { AuthNavProps } from "../../../api/types/AuthNavProps";
import Center from "../../../components/Center";

const CreateNotePage: React.FC<{ navigation: any }> = ({ navigation }) => {
	return (
		<Center>
			<Button title="OTWÓRZ" onPress={() => navigation.openDrawer()} />
			<Text>Create Note Page</Text>
		</Center>
	);
};

export default CreateNotePage;
