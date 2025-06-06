import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';

export default function Radiobtn() {
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        slotProps={{ input: { 'aria-label': 'A' } }}
      />

    </Box>
  );
}
