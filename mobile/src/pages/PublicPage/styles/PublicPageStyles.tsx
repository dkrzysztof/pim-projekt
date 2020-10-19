import { StyleSheet } from 'react-native';

const PublicPageStyles = StyleSheet.create({
	container: {
		paddingTop: 30,
		flex: 1,
		color: 'white',
		backgroundColor: '#292F3D',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bodyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		width: 350,
		height: '80%'
	},
	titleContainer: {
		flex: 1,
		height: '20%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonsContainer: {
		height: '10%',
		width: '90%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	componentContainer: {
		height: '50%',
		width: '100%'
	},
	title: {
		color: 'white',
		fontSize: 48,
		fontFamily: 'RobotoSlab_Bold',
		letterSpacing: 5
	}
});

export default PublicPageStyles;
