import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { commerce } from './lib/commerce';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);
		// item.cart is commerceJS cart added items
		setCart(cart);
	};

	const handleUpdateCartQty = async (lineItemId, quantity) => {
		const { cart } = await commerce.cart.update(lineItemId, { quantity });

		setCart(cart);
	};

	const handleRemoveFromCart = async (lineItemId) => {
		const { cart } = await commerce.cart.remove(lineItemId);

		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Switch>
					<Route exact path='/'>
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path='/cart'>
						<Cart
							cart={cart}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
							onEmptyCart={handleEmptyCart}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
