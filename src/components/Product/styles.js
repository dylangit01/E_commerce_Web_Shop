import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
	},
	media: {
		height: '2vh',
		paddingTop: '56.25%', // 16:9
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	CardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));
