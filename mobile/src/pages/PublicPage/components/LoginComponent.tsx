import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Button,
	Text,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import { RoutesList } from '../../../Routes';

interface LoginPageProps {
	navigation: StackNavigationProp<RoutesList, 'Public'>;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
	const [loading, setLoading] = useState<boolean>(false);

	const handleSignInButtonClick = () => {
		setLoading(true);
		setTimeout(() => {
			navigation.navigate('Home');
			setLoading(false);
		}, 1500);
	};
	return (
		<>
			<View style={styles.viewTextInput}>
				<TextInput
					placeholder="Username"
					placeholderTextColor="#CCCCCC"
					style={styles.textInput}
				></TextInput>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#CCCCCC"
					secureTextEntry
					style={styles.textInput}
				></TextInput>
			</View>
			<View style={styles.bottomPaneContainer}>
				<TouchableOpacity
					style={styles.signInButton}
					activeOpacity={0.7}
					onPress={handleSignInButtonClick}
					disabled={loading}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ fontSize: 21 }}>
							{!loading ? 'Sign In' : 'Loading...'}
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.topRectangle}></View>
				<View style={styles.bottomRectangle}></View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	textInput: {
		borderRadius: 15,
		borderColor: 'white',
		borderWidth: 2,
		color: 'white',
		padding: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 15,
		margin: 'auto'
	},
	viewTextInput: {
		height: '10%',
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottomPaneContainer: {
		bottom: 0,
		height: '50%'
	},
	topRectangle: {
		height: '50%'
	},
	signInButton: {
		position: 'absolute',
		zIndex: 2,
		bottom: 50,
		right: 50,
		backgroundColor: 'white',
		width: 120,
		borderRadius: 10,
		height: 50
	},
	bottomRectangle: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: 75,
		backgroundColor: '#414858'
	}
});

export default LoginPage;
