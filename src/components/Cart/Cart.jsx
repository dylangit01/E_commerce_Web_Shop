import React from 'react';
import { Container, Typography, Button, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem'

const Cart = ({ cart }) => {
	const classes = useStyles();

	// Has to return the JSX file
	const EmptyCart = () => <Typography variant='subtitle1'>You shopping cart is empty, adding some!</Typography>;

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{console.log(cart)}
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem item={item} />
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

	
	// When first time into Cart component, it will show 'Cannot read property 'length' of undefined', it means it doesn't fetch the cart line_items yet. In order to solve this, either add "?" after cart or add return 'Loading...' when cart.line_items doesn't exist
	
	// if (!cart.line_items) return 'Loading...';

	return (
		<>
			{!cart.line_items ? (
				<div className={classes.circularProcess}>
					<CircularProgress size='5em' />
				</div>
			) : (
				<Container>
					{/* classes.toolbar is used to push below content lower position  */}
					<div className={classes.toolbar} />
					<Typography className={classes.title} variant='h3' gutterBottom>
						Your Shopping Cart
					</Typography>
					{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
				</Container>
			)}
		</>
	);
};

export default Cart;
