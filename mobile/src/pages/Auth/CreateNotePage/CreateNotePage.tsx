import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import CreateNoteForm from "./components/CreateNoteForm";

interface CreateNoteContainerProps {
	navigation: StackNavigationProp<{ Home: undefined; CreateNote: undefined; LogOut: undefined }, "CreateNote">;
}

const CreateNotePage: React.FC<CreateNoteContainerProps> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<CreateNoteForm navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#292F3D",
		height: "100%",
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CreateNotePage;
