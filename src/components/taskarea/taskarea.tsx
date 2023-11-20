import { FC, ReactElement } from 'react';
import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';

export const TaskArea: FC = (): ReactElement => {
  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>

      <Grid container display='flex' justifyContent={'center'}>
        <Grid
          item
          display={'flex'}
          justifyContent={'space-around'}
          alignItems={'center'}
          md={10}
          xs={12}
          mb={8}
        >
          <Box>Task Counter</Box>
          <Box>Task Counter</Box>
          <Box>Task Counter</Box>
        </Grid>
        <Grid item display={'flex'} flexDirection={'column'} xs={10} md={8}>
          <Box>Tasks will come over here</Box>
          <Box>Tasks will come over here</Box>
          <Box>Tasks will come over here</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
