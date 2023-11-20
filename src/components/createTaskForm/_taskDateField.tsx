import React, { FC, ReactElement, useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const TaskDateField: FC = (): ReactElement => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
    </>
  );
};
