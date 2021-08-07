import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';

const Cart = ({ cart }) => {
	const classes = useStyles();
	const isEmpty = !cart.line_items.length;

	// Has to return the JSX file
	const EmptyCart = () => <Typography variant='subtitle1'>You shopping cart is empty, adding some!</Typography>;

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{console.log(cart)}
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<div>{item.name}</div>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
				<div>
					<Button variant='contained' className={classes.emptyButton} size='large' type='button' color='secondary'>
						Empty Cart
					</Button>
					<Button variant='contained' className={classes.checkout} size='large' type='button' color='primary'>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	return (
		<Container>
			{/* classes.toolbar is used to push below content lower  */}
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant='h3' gutterBottom>
				Your Shopping Cart
			</Typography>
			{isEmpty ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
