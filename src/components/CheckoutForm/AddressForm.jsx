import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken }) => {
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

	const countriesArr = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, name }));

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

		setShippingOptions(options);
		setShippingOption(options[0].id);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={() => {}}>
					<Grid container spacing={3}>
						<FormInput required name='firstName' label='First name' />
						<FormInput required name='lastName' label='Last name' />
						<FormInput required name='address1' label='Address line 1' />
						<FormInput required name='email' label='Email' />
						{/* <FormInput required name="country" label="Country" />
            <FormInput required name="state" label="State" /> */}
						<FormInput required name='city' label='City' />
						<FormInput required name='zip' label='Zip / Postal code' />

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
								{countriesArr.map(({ id, name }) => (
									<MenuItem key={id} value={id}>
										{name}
									</MenuItem>
								))}
							</Select>
						</Grid>

						{/* <Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={''} fullWidth onChange={''}>
								<MenuItem key={''} value={''}>
									Select Me
								</MenuItem>
							</Select>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={''} fullWidth onChange={''}>
								<MenuItem key={''} value={''}>
									Select Me
								</MenuItem>
							</Select>
						</Grid> */}
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
