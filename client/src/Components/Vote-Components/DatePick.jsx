import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker  } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';

const DatePick = () => {
  const [value, setValue] = React.useState(dayjs());
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker label="" 
        // label="Pick a date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slots={{ textField: TextField }}
        enableAccessibleFieldDOMStructure={false}
      />
    </LocalizationProvider>
    </>
  )
}

export default DatePick