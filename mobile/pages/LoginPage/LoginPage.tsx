import * as React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const LoginPage: React.FC<{}> = () => {
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
				<View style={styles.topRectangle}>
					<View>
						<View></View>
						<View
							style={{
								position: 'relative',
								top: '170%',
								right: 0,
								width: 100,
								height: 50
							}}
						>
							<Button onPress={() => {}} title="asldjalksdjl" />
						</View>
					</View>
				</View>
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
	bottomRectangle: {
		height: '50%',
		backgroundColor: '#414858'
	}
});

export default LoginPage;
