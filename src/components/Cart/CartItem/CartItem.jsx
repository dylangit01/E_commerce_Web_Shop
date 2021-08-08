import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
	const classes = useStyles();

	return (
		<Card>
			<CardMedia className={classes.media} image={item.media.source} alt={item.name} />
			<CardContent className={classes.cardContent}>
				<Typography variant='h6'>{item.name}</Typography>
				<Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button onClick={() => onUpdateCartQty(item.id, item.quantity - 1)} type='button' size='small'>
						-
					</Button>
					<Typography>&nbsp;{item.quantity}&nbsp;</Typography>
					<Button onClick={() => onUpdateCartQty(item.id, item.quantity+1)} type='button' size='small'>
						+
					</Button>
				</div>
				<Button onClick={() => onRemoveFromCart(item.id)} variant='contained' type='button' color='secondary'>
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
