import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import eShopLogo from '../../assets/online-shopping-logo-2.png'

const Navbar = ({totalItems}) => {
	const classes = useStyles();
	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography className={classes.logoImg}>
						<img src={eShopLogo} alt='DylanCommerceShop.js' height='35px' className={classes.image} />
						Online Web Shop
					</Typography>
					<div className={classes.grow} />
					<div className={classes.button}>
						<IconButton aria-label='Show cart items' color='inherit'>
							<Badge badgeContent={totalItems} color='secondary'>
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Navbar
