import { ChangeEvent, useState } from 'react';
import { Item, ItemEntity, ItemResponse } from '../types';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '../api/itemapi';
import ItemDialogContent from './ItemDialogContent';
import { EditRounded } from '@mui/icons-material';

type ItemProp = {
  itemProp: ItemResponse;
};

function EditItem({ itemProp }: ItemProp) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    product: '',
    amount: 0,
  });

  const handleClickOpen = () => {
    setItem({
      product: itemProp.product,
      amount: itemProp.amount,
    });
    setOpen(true);
  };

  const handleClickClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
    onError: (err) => console.log(err),
  });

  const handleSave = () => {
    const url = itemProp._links.self.href;
    const itemEntity: ItemEntity = { item, url };
    mutate(itemEntity);
    setItem({
      product: '',
      amount: 0,
    });
    handleClickClose();
  };

  return (
    <>
      <Tooltip title='Edit Item'>
        <IconButton onClick={handleClickOpen} size='small' aria-label='edit'>
          <EditRounded fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <ItemDialogContent item={item} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClickClose} fullWidth>
            Cancel | 취소
          </Button>
          <Button onClick={handleSave} fullWidth>
            Edit | 수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditItem;
