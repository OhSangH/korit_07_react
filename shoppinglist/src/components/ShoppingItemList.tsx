import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { Button, Snackbar, Alert, Box } from '@mui/material';
import { getItem, deleteItem } from '../api/shoppingapi';
import { ShoppingItem } from '../types';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import EditItem from './EditItem';
import AddItem from './AddItem';

import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';

function ShoppingItemList() {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState('');
  const [snackbarSeverity, setSnackBarSeverity] = useState<'success' | 'error'>('success');

  const queryClient = useQueryClient();

  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery<ShoppingItem[], Error>({
    queryKey: ['items'],
    queryFn: getItem,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      setSnackBarMsg('해당 쇼핌 품목이 정상적으로 삭제 되었습니다.');
      setSnackBarSeverity('success');
      setOpenSnackBar(true);
    },
    onError: (err) => {
      console.log('삭제 에러: ' + err);
      const message = err?.message || '삭제 실패 에러';
      setSnackBarMsg(message);
      setSnackBarSeverity('error');
      setOpenSnackBar(true);
    },
  });

  const columnDefs: ColDef<ShoppingItem>[] = [
    { field: 'product', sortable: true, filter: true, flex: 2 },
    { field: 'amount', sortable: true, filter: true, flex: 2 },
    {
      field: 'purchased',
      sortable: true,
      filter: true,
      flex: 1,

      cellRenderer: (params: { value: boolean }) => (params.value ? 'Yes' : 'No'),
    },
    {
      cellRenderer: (params: { data?: ShoppingItem }) => (params.data ? <EditItem itemdata={params.data} /> : null),
    },
    {
      cellRenderer: (params: { data?: ShoppingItem }) =>
        params.data ? (
          <Button
            size='small'
            color='error'
            onClick={() => {
              if (window.confirm(`${params.data?.product} 항목을 삭제하시겠습니까?`) && params.data) {
                deleteMutate(params.data.id);
              }
            }}
          >
            Delete
          </Button>
        ) : null,
      width: 120,
    },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  if (isLoading) {
    return <span>Loading ... 🕐</span>;
  }

  if (isError) {
    return <span>항목을 가져오는 데 오류가 발생했습니다. : {error.message}</span>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, mt: 2 }}>
        <AddItem />
      </Box>
      <Box className='ag-theme-material' style={{ height: 500, width: 200 }}>
        <AgGridReact
          rowData={items}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          domLayout='autoHeight'
        />
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackBar(false)}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShoppingItemList;
