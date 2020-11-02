import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PublicPage from "./pages/PublicPage/PublicPage";

interface RoutesList {}

const Stack = createStackNavigator<RoutesList>();

const Routes: React.FC<{}> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Public"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Public" component={PublicPage} />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

export default Routes;
