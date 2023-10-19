import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import Button from '../Button/Button';

const PoolTableForm = ({
	onSubmit,
	loading,
	error,
	defaultValues,
	setFormValues,
	isUpdate,
}) => {
	const [formValues, setLocalFormValues] = useState({});

	// Only update local state if defaultValues change
	useEffect(() => {
		if (defaultValues) {
			setLocalFormValues(defaultValues);
		}
	}, [defaultValues]);

	const fields = [
		{
			type: 'text',
			name: 'location_name',
			label: 'Location Name',
		},
		{
			type: 'number',
			name: 'num_of_pool_tables',
			label: 'Number of Pool Tables',
		},
		{
			type: 'text',
			name: 'discounted_days',
			label: 'Discounted Days',
		},
		{
			type: 'text',
			name: 'hours',
			label: 'Hours',
		},
		{
			type: 'number',
			name: 'rating',
			label: 'Rating',
		},
		{
			type: 'number',
			name: 'lat',
			label: 'Latitude',
		},
		{
			type: 'number',
			name: 'lng',
			label: 'Longitude',
		},
	];

	if (isUpdate) {
		fields.unshift({
			type: 'text',
			name: 'id',
			label: 'ID',
			disabled: true,
		});
	}

	return (
		<form onSubmit={onSubmit}>
			{fields.map((field) => (
				<FormInput
					key={field.name}
					type={field.type}
					name={field.name}
					label={field.label}
					error={error[field.name]}
					value={formValues[field.name] || ''}
					onChange={(e) => {
						let value = e.target.value;
						if (field.type === 'number') {
							value =
								field.name === 'num_of_pool_tables'
									? parseInt(value, 10)
									: parseFloat(value);
						}
						const updatedFormValues = {
							...formValues,
							[field.name]: value,
						};
						setLocalFormValues(updatedFormValues);
						if (
							JSON.stringify(updatedFormValues) !==
							JSON.stringify(formValues)
						) {
							setFormValues(updatedFormValues);
						}
					}}
				/>
			))}
			<Button loading={loading} error={error} title={'Submit'} />
		</form>
	);
};

export default PoolTableForm;
