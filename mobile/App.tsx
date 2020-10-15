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
			<Text>Open up App.tsx to start working on your 1!</Text>
			<StatusBar style="auto" />
			<TouchableHighlight onPress={() => console.log('image tapped!')}>
				<Image
					blurRadius={2}
					fadeDuration={1000}
					source={{
						uri:
							'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
						height: 400,
						width: 200
					}}
				/>
			</TouchableHighlight>
			<Button title="CLICK" onPress={handleClick} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
