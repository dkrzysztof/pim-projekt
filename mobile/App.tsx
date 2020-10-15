import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	ImageBackground,
	TouchableOpacity
} from 'react-native';
import LandingPageTextButton from './components/LandingPageTextButton';

import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

export default function App() {
	const [isToggled, toggleView] = useState<boolean>(true);

	const handleToggleViewChange = () => {
		toggleView(!isToggled);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Planday</Text>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.buttonsContainer}>
					<LandingPageTextButton
						buttonTitle="Sign In"
						onPress={handleToggleViewChange}
						isToggled={isToggled}
					/>
					<LandingPageTextButton
						buttonTitle="Sign Up"
						onPress={handleToggleViewChange}
						isToggled={!isToggled}
					/>
				</View>
			</View>
			<View style={styles.componentContainer}>
				{isToggled ? <LoginPage /> : <SignUpPage />}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		flex: 1,
		color: 'white',
		backgroundColor: '#292F3D',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		width: 350,
		height: '80%'
	},
	titleContainer: {
		flex: 1,
		height: '20%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonsContainer: {
		height: '10%',
		width: '90%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	componentContainer: {
		height: '50%',
		width: '100%'
	},
	title: {
		color: 'white',
		fontSize: 48
	}
});
