// import { CarResponse } from '../types';
import { useQuery /* useMutation, useQueryClient */ } from '@tanstack/react-query';
import { DataGrid, GridColDef /*GridCellParams,*/ } from '@mui/x-data-grid';
import { Snackbar /* IconButton, Tooltip*/ } from '@mui/material';
import { useState } from 'react';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { getItems } from '../api/itemapi';
import AddItem from './AddItem';

function CarList() {
  const [open, setOpen] = useState(false);
  // const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  // const { mutate } = useMutation(deleteCar, {
  //   onSuccess: () => {
  //     setOpen(true);
  //     queryClient.invalidateQueries({ queryKey: ['cars'] }); // 이부분은 useQuery()를 정의한 부분과 관련있다.
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  const columns: GridColDef[] = [
    { field: 'product', headerName: 'Product', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    // {
    //   field: 'edit',
    //   headerName: '',
    //   width: 90,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />,
    // },
    // {
    //   field: 'delete',
    //   headerName: '',
    //   width: 90,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params: GridCellParams) => (
    //     <Tooltip title='Delete Car'>
    //       <IconButton
    //         aria-label='Delete'
    //         size='small'
    //         onClick={() => {
    //           if (window.confirm(`${params.row.product}제품을 삭제 하시겠습니까?`)) {
    //             mutate(params.row._links.self.href);
    //           }
    //         }}
    //       >
    //         <DeleteForeverRoundedIcon fontSize='small' />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
  ];

  if (!isSuccess) {
    return <span>Loading...🕐</span>;
  }

  if (error) {
    return <span>제품들을 불러오는데 실패했습니다🚗... </span>;
  } else {
    return (
      <>
        <AddItem />
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._links.self.href} />
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
