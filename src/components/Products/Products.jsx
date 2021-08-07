import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import Product from '../Product/Product'

const products = [
	{id: 1, name: 'Shoes', description: 'Running shoes', price: '$150'},
	{id: 2, name: 'Macbook Pro', description: 'Apple macbook', price: '$2999'},
]

const Products = () => {
	const classes = useStyles();
	return (
		<main>
			<Grid container justifyContent='center' spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} md={4} lg={3}>
						<Product product ={product} />
					</Grid>
				))}
			</Grid>
		</main>
	)
}

export default Products
