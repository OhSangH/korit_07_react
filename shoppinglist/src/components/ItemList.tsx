// import { CarResponse } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Snackbar, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { deleteItem, getItems } from '../api/itemapi';
import AddItem from './AddItem';
import EditItem from './EditItem';
// import { ItemResponse } from '../types';

function CarList() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  // const [items, setItem] = useState<ItemResponse[]>([
  //   {
  //     product: '',
  //     amount: 0,
  //     _links: {
  //       self: {
  //         href: '',
  //       },
  //     },
  //   },
  // ]);

  // getItems().then((data) => setItem(data));

  const { mutate } = useMutation(deleteItem, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['items'] }); // 이부분은 useQuery()를 정의한 부분과 관련있다.
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (!isSuccess) {
    return <span>Loading...🕐</span>;
  }

  if (error) {
    return <span>제품들을 불러오는데 실패했습니다🚗... </span>;
  } else {
    return (
      <>
        <AddItem />
        <List>
          {data.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={item.product} secondary={item.amount} />
              <EditItem itemProp={item} />
              <Tooltip title='Delete Car'>
                <IconButton
                  aria-label='Delete'
                  size='small'
                  onClick={() => {
                    if (window.confirm(`${item.product}제품을 삭제 하시겠습니까?`)) {
                      mutate(item._links.self.href);
                    }
                  }}
                >
                  <DeleteForeverRoundedIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='선택한 제품 정보가 삭제되었습니다.'
        />
      </>
    );
  }
}

export default CarList;
