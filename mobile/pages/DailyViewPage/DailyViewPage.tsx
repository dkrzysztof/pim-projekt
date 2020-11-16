import * as React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import Header from '../../shared/Header'
import ButtonTrans from '../../shared/ButtonTrans'

const DailyViewPage: React.FC<{}> = () => {
	return (
		<>
			<Header />
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>Important Task 1</Text>
						<View style={styles.titleUnderline} />
					</View>
					<View style={styles.dateContainer}>
						<Text style={styles.dateText}>No notification date !</Text>
						<View style={styles.thinUnderline} />
						<Text style={styles.infoText}>Event Date</Text>
					</View>
					<View style={styles.dateContainer}>
						<Text style={styles.dateText}>No notification date !</Text>
						<View style={styles.thinUnderline} />
						<Text style={styles.infoText}>Notification Date</Text>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consect
							etur adipiscing elit. Maecenas non ex accumsan nisl gravida sodales 
							eu a eros. Maecenas urna eros, laoreet ut orci vel, dignissim posuere
							risus. Ut eleifend arcu a purus luctus, quis luctus mauris fringilla.
						</Text>
						<View style={styles.thinUnderline} />
						<Text style={styles.infoText}>Description</Text>
					</View>
				</View>
				
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonsInnerContainer}>
						<ButtonTrans text={'Edit'} type={'edit'}></ButtonTrans>
						<ButtonTrans text={'Delete'} type={'delete'}></ButtonTrans>
					</View>
						<ButtonTrans text={'Go back'} type={'back'}></ButtonTrans>
					</View>
			</View>
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
