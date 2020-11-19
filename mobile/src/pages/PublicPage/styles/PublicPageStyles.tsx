import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PublicPageStyles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		backgroundColor: "#292F3D",
		height: "100%",
		width: "100%",
	},
	justifyContentAround: {
		height: "100%",
		width: "100%",
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		height: 300,
	},
	titleContainer: {
		paddingTop: 30,
		height: 100,
		margin: "auto",
		alignSelf: "center",
	},
	componentContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		height: 800,
		bottom: 0,
		width: "100%",
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		maxHeight: 100,
	},

	title: {
		color: "white",
		fontSize: 48,
		fontFamily: "RobotoSlab_Bold",
		letterSpacing: 5,
	},
});

export default PublicPageStyles;
