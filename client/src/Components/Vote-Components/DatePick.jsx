import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker  } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';

const DatePick = ({selectedDate, onDateChange, pickerLabel}) => {
  // const [value, setValue] = React.useState(dayjs());
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker 
        label={pickerLabel}
        // label="Pick a date"
        value={selectedDate}
        onChange={(newValue) => onDateChange(newValue)}
        slots={{ textField: TextField }}
        enableAccessibleFieldDOMStructure={false}
        
      />
    </LocalizationProvider>
    </>
  )
}

export default DatePick