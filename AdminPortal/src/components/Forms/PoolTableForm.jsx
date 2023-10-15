import React from 'react';
import FormInput from './FormInput';
import Button from '../Button/Button';

const PoolTableForm = ({
  formValues,
  setFormValues,
  onSubmit,
  loading,
  error,
  defaultValues,
  isUpdate,
}) => {
  const fields = [
    {
      type: 'text',
      name: 'location_name',
      label: 'Location Name',
    },
    {
      type: 'text',
      name: 'num_of_pool_tables',
      label: 'Number of Pool Tables',
    },
    {
      type: 'text',
      name: 'location_gps',
      label: 'Location GPS',
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
      type: 'text',
      name: 'rating',
      label: 'Rating',
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
          value={
            (formValues && formValues[field.name]) ||
            (defaultValues && defaultValues[field.name])
          }
          onChange={(e) =>
            setFormValues({
              ...formValues,
              [field.name]: e.target.value,
            })
          }
        />
      ))}
      <Button loading={loading} error={error} title={'Submit'} />
    </form>
  );
};

export default PoolTableForm;
