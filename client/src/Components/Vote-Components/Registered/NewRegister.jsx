import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const NewRegister = ({text}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Congratulations
      </Typography>
      <p>{text}</p>
      <p>You have successfully Registered</p>
    </CardContent>
    <CardActions className='flex justify-center'>
      <a href="/login">
       Login
      </a>
    </CardActions>
  </Card>
  )
}

export default NewRegister