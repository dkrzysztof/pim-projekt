import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Text, StyleSheet } from "react-native";
import Center from "../Center";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
	const [loadingText, setLoadingText] = useState<string>(".");
	let loadingTextBuilder = "..";

	const appendDot = () => {
		setTimeout(() => {
			if (loadingTextBuilder.length > 4) {
				loadingTextBuilder = "..";
			} else {
				loadingTextBuilder = loadingTextBuilder + ".";
			}
			setLoadingText(loadingTextBuilder);
			appendDot();
		}, 2000);
	};

	appendDot();
	return (
		<Center>
			<ActivityIndicator size="large" color="#42bff5" />
		</Center>
	);
};

const styles = StyleSheet.create({
	background: {
		color: "white",
		backgroundColor: "#292F3D",
	},
	text: {
		color: "white",
		fontSize: 20,
	},
});

export default LoadingScreen;
