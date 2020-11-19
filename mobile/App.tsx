import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Routes";
import { Provider } from "react-redux";
import store from "./src/state/store";

interface AppState {
	isReady: boolean;
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			isReady: false,
		};
	}

	async componentDidMount() {
		console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			RobotoSlab: require("./assets/fonts/RobotoSlab-Medium.ttf"),
			RobotoSlab_Bold: require("./assets/fonts/RobotoSlab-SemiBold.ttf"),
			RobotoSlab_Light: require("./assets/fonts/RobotoSlab-Light.ttf"),
			OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
			OpenSans_Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
			...Ionicons.font,
		});
		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		}

		return (
			<Provider store={store}>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</Provider>
		);
	}
}
