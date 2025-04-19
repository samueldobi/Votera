import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker  } from '@mui/x-date-pickers/DateTimePicker';

const DatePick = () => {
  const [value, setValue] = React.useState(null);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label="Basic date time picker" 
        // label="Pick a date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </>
  )
}

export default DatePick