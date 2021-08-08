import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label }) {
	const { control } = useFormContext();
	const isError = false;

	// react-hook-form now requires a render props
	return (
		<Grid item xs={12} sm={6}>
			<Controller
				control={control}
				render={({ field }) => <TextField fullWidth {...field} label={label} required />}
				name={name}
				error={isError}
			/>
		</Grid>
	);
}

export default FormInput;
