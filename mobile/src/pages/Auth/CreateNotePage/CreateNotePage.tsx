import React from "react";
import { View } from "react-native";
import CreateNoteForm from "./components/CreateNoteForm";

interface CreateNoteContainerProps {}

const CreateNotePage: React.FC<CreateNoteContainerProps> = () => {
	return (
		<View>
			<CreateNoteForm />
		</View>
	);
};

export default CreateNotePage;
