// import { CarResponse } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar } from '../api/carapi';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { useState } from 'react';
import AddCar from './AddCar';

function CarList() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars'] }); // 이부분은 useQuery()를 정의한 부분과 관련있다.
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'registrationNumber', headerName: 'Reg.nr', width: 150 },
    { field: 'modelYear', headerName: 'Model Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (window.confirm(`${params.row.brand}의 ${params.row.model}자동차를 삭제 하시겠습니까?`)) {
              mutate(params.row._links.self.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading...🕐</span>;
  }

  if (error) {
    return <span>자동차들을 불러오는데 실패했습니다🚗... </span>;
  } else {
    return (
      <>
        <AddCar />
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._links.self.href} />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='선택한 자동차 정보가 삭제되었습니다.'
        />
      </>
    );
  }
}

export default CarList;
