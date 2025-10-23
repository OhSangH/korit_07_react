import { ChangeEvent, useState } from 'react';
import { Item } from '../types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItem } from '../api/itemapi';

function AddItem() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    product: '',
    amount: 0,
  });

  const handleClickOpen = () => setOpen(true);

  const handleClickClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
    onError: (err) => console.log(err),
  });

  const handleSave = () => {
    mutate(item);
    setItem({
      product: '',
      amount: 0,
    });
    handleClickClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant='outlined'>
        New Item
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField name='product' label='Product' value={item.product} onChange={handleChange} />
            <TextField name='amount' label='Amount' value={item.amount} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Add | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItem;
