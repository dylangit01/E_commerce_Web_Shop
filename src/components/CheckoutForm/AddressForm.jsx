import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, next }) => {
	const methods = useForm();

	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState('');
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState('');

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
		setShippingCountries(countries);
		// Convert countries object to an array and get the first country
		setShippingCountry(Object.keys(countries)[0]);
	};

	const countriesArr = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const subdivisionsArr = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));

	const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

		setShippingOptions(options);
		setShippingOption(options[0].id);
	};

	const options = shippingOptions.map((shipOption) => ({
		id: shipOption.id,
		label: `${shipOption.description} - (${shipOption.price.formatted_with_symbol})`,
	}));

	// Fetch countries first:
	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, [checkoutToken.id]);

	// Only when we got the country, then fetch the subdivisions
	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	// Only when we got the shippingSubdivision, then fetch the shipping options
	useEffect(() => {
		if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	}, [shippingSubdivision, checkoutToken.id, shippingCountry]);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				{/* The submit data needs to be received to Checkout component */}
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
					)}
				>
					<Grid container spacing={3}>
						<FormInput name='firstName' label='First name' />
						<FormInput name='lastName' label='Last name' />
						<FormInput name='address1' label='Address line 1' />
						<FormInput name='email' label='Email' />
						<FormInput name='city' label='City' />
						<FormInput name='zip' label='Zip / Postal code' />

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
								{countriesArr.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping State</InputLabel>
							<Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
								{subdivisionsArr.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
								{options.map(({ id, label }) => (
									<MenuItem key={id} value={id}>
										{label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button component={Link} variant='outlined' to='/cart'>
							Back to Cart
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
