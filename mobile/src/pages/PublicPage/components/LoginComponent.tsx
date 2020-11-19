import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Button,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from "react-native";
import { AuthNavProps } from "../../../api/types/AuthNavProps";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../../state/session/session.thunk";
import { Icon } from "react-native-elements";

const LoginPage: React.FC<AuthNavProps<"Public">> = ({ navigation }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [credentials, setCredentials] = useState({ email: "user3@user.com", password: "Admin123!" });
	const dispatch = useDispatch();
	let isMounted = true;
	useEffect(() => {
		return () => {
			isMounted = false;
		};
	});

	const handleSignInButtonClick = () => {
		setLoading(true);
		setTimeout(() => {
			dispatch(authenticateUser(credentials));
			if (isMounted) {
				setLoading(false);
			}
		}, 500);
	};

	return (
		<>
			<View style={styles.viewTextInput}>
				<TextInput
					placeholder="Username"
					placeholderTextColor="#CCCCCC"
					style={styles.textInput}
					onChangeText={(email) => setCredentials({ email, password: credentials.password })}
					value={credentials.email}
				></TextInput>
				<TextInput
					placeholder="Password"
					placeholderTextColor="#CCCCCC"
					secureTextEntry
					style={styles.textInput}
					value={credentials.password}
					onChangeText={(password) => setCredentials({ email: credentials.email, password })}
				></TextInput>
			</View>
			<TouchableOpacity
				style={styles.signInButton}
				activeOpacity={0.7}
				onPress={handleSignInButtonClick}
				disabled={loading}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 21 }}>
						{!loading ? (
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ fontSize: 21 }}>Sign In{"  "}</Text>
								<Icon type="ionic" name="play-arrow" size={26} color="black" />
							</View>
						) : (
							"Loading..."
						)}
					</Text>
				</View>
			</TouchableOpacity>
			<View style={styles.bottomRectangle}></View>
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
		marginBottom: 15,
		margin: "auto",
	},
	viewTextInput: {
		height: 150,
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomPaneContainer: {
		height: 100,
	},
	topRectangle: {
		height: "50%",
	},
	signInButton: {
		position: "absolute",
		zIndex: 2,
		bottom: 150,
		right: 40,
		backgroundColor: "white",
		width: 120,
		borderRadius: 10,
		height: 50,
	},
	bottomRectangle: {
		width: "100%",
		height: 100,
		backgroundColor: "#414858",
	},
});

export default LoginPage;
