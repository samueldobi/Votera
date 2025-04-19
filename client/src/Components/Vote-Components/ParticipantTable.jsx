import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
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
  ];

const ParticipantTable = ({rowDetails}) => {
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

export default ParticipantTable