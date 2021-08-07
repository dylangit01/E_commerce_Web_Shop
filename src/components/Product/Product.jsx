import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.image || 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_663974538_353364.jpg'}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.CardContent}>
					<Typography variant='h6' gutterBottom> {product.name} </Typography>
					<Typography variant='h6'>{product.price}</Typography>
				</div>
				<Typography variant='body2' color='textSecondary'> {product.description} </Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>

				{/* aria-label is for someone cannot see the button of the screen */}
				<IconButton aria-label='Add to Card'>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
}

export default Product
