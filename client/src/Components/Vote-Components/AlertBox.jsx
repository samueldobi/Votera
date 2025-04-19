import React from 'react'
import Alert from '@mui/material/Alert';

const AlertBox = ({text}) => {
  return (
    <div className='m-2 p-2'>
    <Alert severity="error" >{text}</Alert>
    </div>
  )
}

export default AlertBox