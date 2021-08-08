import React from 'react';
import { Typography, AppBar, Toolbar, IconButton, Badge, MenuItem, Menu } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import eShopLogo from '../../assets/online-shopping-logo-2.png';

const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	const location = useLocation();

	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
						<img src={eShopLogo} alt='DylanCommerceShop.js' height='35px' className={classes.image} />
						Online Web Shop
					</Typography>
					<div className={classes.grow} />
					
					{/* use location.pathname to toggle the cart component */}
					{location.pathname === '/' && (
						<div className={classes.button}>
							<IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
								<Badge badgeContent={totalItems} color='secondary'>
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
