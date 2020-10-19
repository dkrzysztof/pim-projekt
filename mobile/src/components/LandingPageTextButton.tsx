import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface LandingPageTextButtonProps {
	isToggled: boolean;
	onPress: () => void;
	buttonTitle: string;
}

const LandingPageTextButton: React.FC<LandingPageTextButtonProps> = ({
	onPress,
	buttonTitle,
	isToggled
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
			<Text
				numberOfLines={1}
				style={isToggled ? styles.subtitleSelected : styles.subtitle}
			>
				{buttonTitle}
			</Text>
			{isToggled && <View style={styles.underlineRectangle}></View>}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	appButtonContainer: {
		elevation: 8,
		padding: 30
	},
	subtitleSelected: {
		color: 'white',
		fontSize: 21,
		fontWeight: 'bold'
	},
	underlineRectangle: {
		backgroundColor: '#7D92FF',
		marginTop: 5,
		borderRadius: 5,
		width: '100%',
		height: 4
	},
	subtitle: {
		color: '#CCCCCC',
		fontSize: 21,
		fontWeight: '100'
	}
});

export default LandingPageTextButton;
