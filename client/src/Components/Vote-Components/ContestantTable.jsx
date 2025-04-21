import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



const ContestantTable = ({rowDetails, handleDelete}) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: ' Name',
      width: 150,
      editable: true,
    },
    {
      field: 'details',
      headerName: 'About',
      width: 150,
      editable: true,
    },
    {
    field: 'actions',
    headerName: 'Delete Contestant',
    width: 100,
    renderCell: (params) => (
      <IconButton
        color="error"
        onClick={() => handleDelete(params.row.id)}
      >
        <DeleteIcon />
      </IconButton>
    ),
  },
  ];
  return (
    <div> <Box sx={{ height: '100%', width: '100%' }}>
    <DataGrid
      rows={rowDetails}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box></div>
  )
}

export default ContestantTable