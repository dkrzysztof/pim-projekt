import React from "react";
import { useState } from "react";
import { SafeAreaView, View, Text, KeyboardAvoidingView } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import LandingPageTextButton from "../../components/LandingPageTextButton";
import LoginPage from "./components/LoginComponent";
import SingUpPage from "./components/SignUpComponent";
import PublicPageStyles from "./styles/PublicPageStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParamList } from "../../Routes";
import { AuthNavProps } from "../../api/types/AuthNavProps";

const PublicPage: React.FC<AuthNavProps<"Public">> = ({ navigation, route }) => {
	const [currentState, setCurrentState] = useState<number>(0);

	return (

		<SafeAreaView style={PublicPageStyles.container}>

			<View style={PublicPageStyles.titleContainer}>
				<Text style={PublicPageStyles.title}>Planday</Text>
			</View>
			<View style={PublicPageStyles.bodyContainer}>

				<View style={PublicPageStyles.buttonsContainer}>
					<LandingPageTextButton
						buttonTitle="Sign In"
						onPress={() => {
							setCurrentState(0);
						}}
						isToggled={currentState === 0}
					/>
					<LandingPageTextButton
						buttonTitle="Sign Up"
						onPress={() => setCurrentState(1)}
						isToggled={currentState === 1}
					/>
				</View>
			</View>

			<View style={PublicPageStyles.componentContainer}>
				{currentState === 0 ? <LoginPage navigation={navigation} route={route} /> : <SingUpPage />}
			</View>

		</SafeAreaView>
	);
};

export default PublicPage;
