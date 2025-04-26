import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const NewRegister = ({text}) => {
  return (
    <Card sx={{ minWidth: 40 }} className='sm:mx-auto sm:w-full sm:max-w-sm card-register'>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 50 }}>
        Congratulations
      </Typography>
      <p>{text}</p>
      <p className='text-2xl'>You have successfully Registered</p>
    </CardContent>
    <CardActions className='flex justify-center'>
      <a href="/login" className='orange-color text-xl'>
       Login
      </a>
    </CardActions>
  </Card>
  )
}

export default NewRegister