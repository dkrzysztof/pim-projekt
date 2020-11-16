import * as React from 'react';
import { View, StyleSheet, Text, Button, Alert, TouchableOpacity, TextInput} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import ButtonTrans from './ButtonTrans'
import Task from './Task'
import Note from './Note'

export interface Props {
    notes: Array<any>
} 

const NotesList: React.FC<Props> = (props) => {
	return (
        <>
            {
                props.notes.map((note, key) =><Note key={key} note={note}/>)
            }
        </>
	);
};

const styles = StyleSheet.create({
    
})

export default NotesList