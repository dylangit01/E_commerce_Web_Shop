import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import Product from '../Product/Product';

// const products = [
// 	{
// 		id: 1,
// 		name: 'Shoes',
// 		description: 'Running shoes',
// 		price: '$150',
// 		image: 'https://images.footlocker.com/is/image/EBFL2/4205587_a1?wid=519&hei=519&fmt=png-alpha',
// 	},
// 	{
// 		id: 2,
// 		name: 'Macbook Pro',
// 		description: 'Apple macbook',
// 		price: '$2999',
// 		image:
// 			'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207',
// 	},
// ];

const Products = ({ products, onAddToCart }) => {
	const classes = useStyles();
	console.log(products);
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
