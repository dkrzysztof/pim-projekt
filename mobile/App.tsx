import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';

export default function App() {
	const handleClick = () => {
		console.log('hello');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Planday</Text>
			<View style={styles.subtitleRow}>
				<Text numberOfLines={1} style={styles.subtitle}>
					Sign In
				</Text>
				<Text numberOfLines={1} style={styles.subtitle}>
					Sign Out
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: 'white',
		backgroundColor: '#292F3D',
		alignItems: 'center',
		justifyContent: 'center'
	},
	subtitleRow: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	title: {
		color: 'white',
		fontSize: 48
	},
	subtitle: {
		color: 'white',
		fontSize: 21
	}
});
