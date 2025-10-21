import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Car } from '../types';
import { ChangeEvent, useState } from 'react';
import { addCar } from '../api/carapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });

  const handleClickOpen = () => setOpen(true);

  const handleClickClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSave = () => {
    mutate(car);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    });
    handleClickClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input type='text' name='brand' value={car.brand} placeholder='Brand' onChange={handleChange} />
          <br />
          <input type='text' name='model' value={car.model} placeholder='Model' onChange={handleChange} />
          <br />
          <input type='text' name='color' value={car.color} placeholder='Color' onChange={handleChange} />
          <br />
          <input
            type='text'
            name='registrationNumber'
            value={car.registrationNumber}
            placeholder='Reg.No'
            onChange={handleChange}
          />
          <br />
          <input type='text' name='modelYear' value={car.modelYear} placeholder='ModelYear' onChange={handleChange} />
          <br />
          <input type='text' name='price' value={car.price} placeholder='Price' onChange={handleChange} />
          <br />
        </DialogContent>
        <button onClick={handleClickClose}>Cancel | 취소</button>
        <button onClick={handleSave}>Add | 저장</button>
      </Dialog>
    </>
  );
}

export default AddCar;
