import * as React from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export interface Props {
    text: string;
	type: string;
}

const pickStyle = (style:string) => {
	switch (style){
		case 'edit':
			return styles.editButton;
		case 'delete':
			return styles.deleteButton;
		case 'back':
			return styles.gobackButton;
		case 'cancel':
			return styles.gobackButton;
		case 'add':
			return styles.addButton;
	}
	return null
  }

  const pickStyleText = (style:string) => {
	switch (style){
		case 'edit':
			return styles.editButtonText;
		case 'delete':
			return styles.deleteButtonText;
		case 'back':
			return styles.gobackButtonText;
		case 'cancel':
			return styles.gobackButtonText;
		case 'add':
			return styles.addButtonText;
	}
	return null
  }

  const pickStyleIcon = (style:string) => {
	switch (style){
		case 'edit':
			return <FontAwesome5 name="edit" size={16} color="#7D92FF" />;
		case 'delete':
			return <AntDesign name="delete" size={16} color="#EE5353" />;
		case 'back':
			return <AntDesign name="arrowleft" size={24} color="#A6A6A6" />;
	}
	return null
  }

const ButtonTrans: React.FC<Props> = (props) => {
	return (
		<TouchableOpacity style={props.type == 'back' ? styles.container2 : styles.container} onPress={() => Alert.alert( props.text )}>
            <View style={pickStyle(props.type)}>
                {pickStyleIcon(props.type)}
                <Text style={pickStyleText(props.type)}>{ props.text }</Text>
            </View>
            {/* <View style={styles.gobackButton}>
                <Text style={props.type ? styles.editButtonText : styles.deleteButtonText}>{ props.text }</Text>
            </View> */}
        </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    container: {
        width: '40%'
	},
	container2: {
		width: '100%',
		marginTop: 20
    },
    editButtonText: {
		fontWeight: 'normal',
		fontSize: 16,
		color: '#7D92FF',
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    deleteButtonText: {
		fontWeight: 'normal',
		fontSize: 16,
		color: '#EE5353',
		textAlign: 'center'
	},
	gobackButtonText: {
		fontWeight: 'normal',
		fontSize: 16,
		color: '#A6A6A6',
		textAlign: 'center'
	},
	addButtonText: {
		fontWeight: 'normal',
		fontSize: 16,
		color: '#292F3D',
		textAlign: 'center'
	},
    buttonsContainer: {
		width: '100%',
		height: 40,
		// backgroundColor: 'gray',
    },
    gobackButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		borderRadius: 15,
		borderWidth: 3,
		borderColor: '#A6A6A6',
		borderStyle: 'solid',
		fontSize: 30,
		paddingHorizontal: 28,
		paddingVertical: 10,
		fontWeight: 'bold'
	},
	addButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		borderRadius: 15,
		borderWidth: 3,
		borderColor: '#FFFFFF',
		borderStyle: 'solid',
		fontSize: 30,
		paddingHorizontal: 28,
		paddingVertical: 10,
		fontWeight: 'bold'
    },
	editButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		borderRadius: 15,
		borderWidth: 3,
		borderColor: '#7D92FF',
		borderStyle: 'solid',
		fontSize: 30,
		paddingHorizontal: 28,
		paddingVertical: 10,
		fontWeight: 'bold'
    },
    deleteButton: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
		backgroundColor: 'transparent',
		borderRadius: 15,
		borderWidth: 3,
		borderColor: '#EE5353',
		borderStyle: 'solid',
		fontSize: 30,
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontWeight: 'bold'
	}
})

export default ButtonTrans