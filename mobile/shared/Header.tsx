import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'

const Header: React.FC<{}> = () => {
	return (
		<View style={styles.header}>
            <Text style={styles.headerText}>Planday</Text>
            <View style={styles.headerUnderline}/>
        </View>
	);
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        padding: 20,
        fontWeight: 'normal',
        fontSize: 28,
        color: '#ffffff',
        letterSpacing: 4
    },
    headerUnderline: {
        width: '80%',
        borderBottomWidth: 2,
        borderBottomColor: '#525E7A',
    }
})

export default Header