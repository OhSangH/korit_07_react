import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import { Car } from '../types';
import { ChangeEvent, useState } from 'react';
import { addCar } from '../api/carapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CarDialogContent from './CarDialogContent';

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
      <Button onClick={handleClickOpen} variant='outlined'>
        New Car
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Add | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
