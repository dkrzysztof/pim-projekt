import * as React from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import ButtonTrans from './ButtonTrans'

export interface Props {
    
}


const NewNoteFormulage: React.FC<Props> = (props) => {
	return (
        <View style={styles.formulageContainer}>
            <Text style={styles.headerText}>{'Add new\nNote'}</Text>
            <View style={styles.underline}/>
            
                <TextInput
                    placeholder="Note title"
                    placeholderTextColor="#CCCCCC"
                    style={styles.textInput}
                ></TextInput> 
                <TextInput
                    placeholder="Priority"
                    placeholderTextColor="#CCCCCC"
                    style={styles.textInput}
                ></TextInput>
                <TextInput
                    placeholder="Event Date"
                    placeholderTextColor="#CCCCCC"
                    style={styles.textInputDashed}
                ></TextInput>
                <TextInput
                    placeholder="Notification Date"
                    placeholderTextColor="#CCCCCC"
                    style={styles.textInputDashed}
                ></TextInput>
                <TextInput
                    placeholder="Description..."
                    placeholderTextColor="#CCCCCC"
                    style={styles.textInputDesc}
                ></TextInput>
                <View style={styles.buttonsContainer}>
                    <ButtonTrans text={'Cancel'} type={'cancel'}></ButtonTrans>
                    <ButtonTrans text={'Add !'} type={'add'}></ButtonTrans>
                </View>
        </View>
	);
};

const styles = StyleSheet.create({
    formulageContainer: {
        width: '90%',
        borderRadius: 15,
		borderColor: '#7D92FF',
		borderWidth: 2,
        color: 'white',
		justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonsContainer: {
        width: 350,
        // paddingHorizontal:10,
        paddingBottom: 10,
        // height: 40,
        // margin: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		// backgroundColor: 'white',
	},
    headerText: {
        padding: 20,
        fontWeight: 'normal',
        fontSize: 28,
        color: '#ffffff',
        letterSpacing: 4,
        textDecorationLine: 'underline',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    underline: {
        width: '90%',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#525E7A',
    },
    textInput: {
		borderRadius: 15,
		borderColor: 'white',
		borderWidth: 2,
		color: 'white',
		paddingLeft: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 15,
        margin: 'auto',
        textAlignVertical: 'center'
    },
    textInputDashed: {
		borderRadius: 15,
		borderColor: 'white',
		borderWidth: 2,
		color: 'white',
		paddingLeft: 15,
		fontSize: 18,
		width: 350,
		height: 50,
		marginBottom: 15,
        margin: 'auto',
        borderStyle: 'dashed'
    },
    textInputDesc: {
		borderRadius: 15,
		borderColor: 'white',
		borderWidth: 2,
		color: 'white',
        paddingLeft: 15,
        paddingTop: 10,
		fontSize: 18,
		width: 350,
		height: 150,
		marginBottom: 15,
        margin: 'auto',
        textAlignVertical: 'top'
    }
})

export default NewNoteFormulage