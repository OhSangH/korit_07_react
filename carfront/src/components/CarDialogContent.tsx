// CarDialogContent
import { ChangeEvent } from 'react';
import { Car } from '../types';
import { DialogContent, TextField, Stack } from '@mui/material';

type DialogFormProps = {
  car: Car;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField name='brand' label='Brand' value={car.brand} onChange={handleChange} />
        <TextField name='model' label='Model' value={car.model} onChange={handleChange} />
        <TextField name='color' label='color' value={car.color} onChange={handleChange} />
        <TextField
          name='registrationNumber'
          label='RegistrationNumber'
          value={car.registrationNumber}
          onChange={handleChange}
        />
        <TextField name='modelYear' label='ModelYear' value={car.modelYear} onChange={handleChange} />
        <TextField name='price' label='Price' value={car.price} onChange={handleChange} />
      </Stack>
    </DialogContent>
  );
}

export default CarDialogContent;
