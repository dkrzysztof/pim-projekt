import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import Header from '../shared/Header'
import NewNoteFormulage from '../shared/NewNoteFormulage'
import NotesList from '../shared/NotesList'

const testNotes = [{
	title:'No Due',
	// date:'21.12.2020r.',
	tasks: [
		{title: 'Important Task 1', importance: 1, done: true},
		{title: 'Important Task 2', importance: 2, done: false},
		{title: 'Important Task 3', importance: 3, done: true},
		{title: 'Important Task 4', importance: 1, done: false},
	]
},
{
	title:'Tuesday',
	date:'21.12.2020r.',
	tasks: [
		{title: 'Important Task 1', importance: 1, done: false},
		{title: 'Important Task 2', importance: 2, done: true},
		{title: 'Important Task 3', importance: 3, done: false},
		{title: 'Important Task 4', importance: 1, done: true},
	]
},
{
	title:'Wednesday',
	date:'22.12.2020r.',
	tasks: [
		{title: 'Important Task 1', importance: 1, done: true},
		{title: 'Task 2', importance: 2, done: false},
		{title: 'Task 3', importance: 3, done: false},
		{title: 'Important Task 4', importance: 1, done: false},
		{title: 'Task 5', importance: 3, done: true},
		{title: 'Task 6', importance: 1, done: false},
	]
},
]
const DailyViewPage: React.FC<{}> = () => {
	return (
		<>
			<Header />
			{/* <View style={styles.container}> */}
			<NewNoteFormulage/>
			{/* <NotesList notes={testNotes}/> */}
			{/* </View> */}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '70%',
		height: '100%',
		justifyContent: 'space-between',
		// backgroundColor: 'red',

	},
	contentContainer: {
		width: '100%',
		justifyContent: 'flex-start',
		// backgroundColor: 'blue',
	},
	titleContainer: {
		width: '100%',
		justifyContent: 'flex-start',
		marginVertical: 40
	},
	titleUnderline: {
		width: '100%',
		borderBottomWidth: 3,
		borderBottomColor: '#EE5353',
		borderRadius: 10
	},
	thinUnderline: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#808080'
	},
	titleText: {
		paddingBottom: 3,
		fontWeight: 'normal',
		fontSize: 18,
		color: '#ffffff',
		textAlign: 'left'
	},
	dateContainer: {
		width: '100%',
		justifyContent: 'flex-start',
		marginVertical: 10
	},
	dateText: {
		paddingBottom: 3,
		fontWeight: 'normal',
		fontSize: 16,
		color: '#A6A6A6',
		textAlign: 'left'
	},
	infoText: {
		fontWeight: 'normal',
		fontSize: 14,
		color: '#808080',
		textAlign: 'left'
	},
	descriptionContainer: {
		width: '100%',
		justifyContent: 'flex-start',
		marginTop: 30,
	},
	descriptionText: {
		fontWeight: 'normal',
		fontSize: 16,
		color: '#ffffff',
		textAlign: 'justify'
	},
	buttonsContainer: {
		width: '100%',
		height: 150,
		// backgroundColor: 'gray',
	},
	buttonsInnerContainer: {
		width: '100%',
		// height: 40,
		justifyContent: 'space-between',
		flexDirection: 'row',
		// backgroundColor: 'white',
	},
	editButton: {
		backgroundColor: 'transparent',
		borderRadius: 15,
		borderWidth: 3,
		borderColor: '#7D92FF',
		borderStyle: 'solid',
		fontSize: 20,
		paddingHorizontal: 28,
		paddingVertical: 10,
		fontWeight: 'bold'
	}
});

export default DailyViewPage;
