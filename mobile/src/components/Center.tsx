import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		color: "white",
		backgroundColor: "#292F3D",
	},
});

const Center: React.FC<{}> = ({ children }) => {
	return <View style={styles.center}>{children}</View>;
};

export default Center;
