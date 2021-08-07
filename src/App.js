import React, {useState, useEffect} from 'react';
import { Products, Navbar, Cart } from './components';

import { commerce } from './lib/commerce';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data)
	}

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);
		console.log(item);
		// item.cart is commerceJS cart added items
		setCart(item.cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);



	return (
		<div>
			<Navbar totalItems={cart.total_items} />
			<Products products={products} onAddToCart={handleAddToCart} />
			<Cart cart={cart} />
		</div>
	);
}

export default App
