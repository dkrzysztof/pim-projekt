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
import DailyViewPage from './pages/DailyViewPage/DailyViewPage'
import TestPage from './pages/TestPage'
import Header from './shared/Header'

export default function App() {
	const [isToggled, toggleView] = useState<boolean>(true);

	const handleToggleViewChange = () => {
		toggleView(!isToggled);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* <DailyViewPage/> */}
			<TestPage />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 110,
		flex: 1,
		color: 'white',
		backgroundColor: '#15181F',
		justifyContent: 'flex-start',
		alignItems: 'center'
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
