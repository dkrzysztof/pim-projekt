import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SingUpPage: React.FC<{}> = () => {
	return (
		<View>
			<Text style={styles.text}>Henlo</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'white'
	}
});

export default SingUpPage;
