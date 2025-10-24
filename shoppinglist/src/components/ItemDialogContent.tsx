import { DialogContent, Stack, TextField } from '@mui/material';
import { Item } from '../types';
import { ChangeEvent } from 'react';

type DialogType = {
  item: Item;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function ItemDialogContent({ item, handleChange }: DialogType) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField name='product' label='Product' value={item.product} onChange={handleChange} fullWidth />
        <TextField name='amount' label='Amount' value={item.amount} onChange={handleChange} fullWidth />
      </Stack>
    </DialogContent>
  );
}

export default ItemDialogContent;
