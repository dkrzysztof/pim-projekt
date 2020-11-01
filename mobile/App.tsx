import React from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PublicPage from "./src/pages/PublicPage/PublicPage";
import HomePage from "./src/pages/Auth/HomePage/HomePage";
import { RoutesList } from "./src/Routes";

interface AppState {
  isReady: boolean;
}

const Stack = createStackNavigator<RoutesList>();

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
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
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Public"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Public" component={PublicPage} />
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
