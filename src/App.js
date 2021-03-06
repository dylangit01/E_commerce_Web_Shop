import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { commerce } from './lib/commerce';

const App = () => {
	// const [mobileOpen, setMobileOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

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

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
			setOrder(incomingOrder);
			// After fill the order, we need to remove the items from the cart, so using refreshCart()
			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
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
					<Route exact path='/checkout'>
						<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
