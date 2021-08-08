import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import Product from '../Product/Product';

const Products = ({ products, onAddToCart }) => {
	const classes = useStyles();
	return (
		<>
			{!products.length ? (
				<div className={classes.circularProcess}>
					<CircularProgress size='5em'/>
				</div>
			) : (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Grid container justifyContent='center' spacing={4}>
						{products.map((product) => (
							<Grid item key={product.id} xs={12} md={4} lg={3}>
								<Product product={product} onAddToCart={onAddToCart} />
							</Grid>
						))}
					</Grid>
				</main>
			)}
		</>
	);
};

export default Products;
