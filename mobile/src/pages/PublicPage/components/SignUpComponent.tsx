import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../state/session/session.thunk';

const SingUpPage: React.FC<{}> = () => {

	const [loading, setLoading] = useState<boolean>(false);
	const [credentials, setCredentials] = useState({ FirstName: "", LastName: "", Email: "", Password: "", ConfirmPassword: "" });

	const dispatch = useDispatch();
	let isMounted = true;
	useEffect(() => {
		return () => {
			isMounted = false;
		};
	});

	const handleSignUpButtonClick = () => {
		setLoading(true);
		setTimeout(() => {
			dispatch(registerUser(credentials));
			if (isMounted) {
				setLoading(false);
			}
		}, 500);
	};

	return (
		<>
			<View style={styles.viewTextInput}>

				<TextInput
					placeholder="First name"
					placeholderTextColor="#CCCCCC"
					style={styles.textInput}
					onChangeText={(FirstName) => setCredentials({ FirstName,
												LastName: credentials.LastName, 
												Email: credentials.Email, 
												Password: credentials.Password, 
												ConfirmPassword: credentials.ConfirmPassword })}
					value={credentials.FirstName}
				></TextInput>

				<TextInput
					placeholder="Last name"
					placeholderTextColor="#CCCCCC"
					style={styles.textInput}
					onChangeText={(LastName) => setCredentials({ FirstName: credentials.FirstName,
												LastName, 
												Email: credentials.Email, 
												Password: credentials.Password, 
												ConfirmPassword: credentials.ConfirmPassword })}
					value={credentials.LastName}
				></TextInput>

				<TextInput
					placeholder="Email"
					placeholderTextColor="#CCCCCC"
					style={styles.textInput}
					onChangeText={(Email) => setCredentials({ FirstName: credentials.FirstName,
												LastName: credentials.LastName, 
												Email, 
												Password: credentials.Password, 
												ConfirmPassword: credentials.ConfirmPassword })}
					value={credentials.Email}
				></TextInput>

				<TextInput
					placeholder="Password"
					placeholderTextColor="#CCCCCC"
					secureTextEntry
					style={styles.textInput}
					onChangeText={(Password) => setCredentials({ FirstName: credentials.FirstName,
												LastName: credentials.LastName, 
												Email: credentials.Email, 
												Password, 
												ConfirmPassword: credentials.ConfirmPassword })}
					value={credentials.Password}
				></TextInput>

				<TextInput
					placeholder="Confirm password"
					placeholderTextColor="#CCCCCC"
					secureTextEntry
					style={styles.textInput}
					onChangeText={(ConfirmPassword) => setCredentials({ FirstName: credentials.FirstName,
												LastName: credentials.LastName, 
												Email: credentials.Email, 
												Password: credentials.Password,  
												ConfirmPassword})}
					value={credentials.ConfirmPassword}
				></TextInput>

			</View>
			<View style={styles.bottomPaneContainer}>
				<TouchableOpacity
					style={styles.signUpButton}
					activeOpacity={0.7}
					onPress={handleSignUpButtonClick}
					disabled={loading}
				>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontSize: 21 }}>{!loading ? "Sign Up" : "Loading..."}</Text>
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
		borderColor: "white",
		borderWidth: 2,
		color: "white",
		padding: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 10,
		margin: "auto",
	},
	viewTextInput: {
		height: "10%",
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomPaneContainer: {
		bottom: 0,
		height: "30%",
	},
	topRectangle: {
		height: "50%",
	},
	signUpButton: {
		position: "absolute",
		zIndex: 0,
		bottom: 50,
		right: 50,
		backgroundColor: "white",
		width: 120,
		borderRadius: 10,
		height: 50,
	},
	bottomRectangle: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		height: 0,
		backgroundColor: "#414858",
	},
});


export default SingUpPage;
