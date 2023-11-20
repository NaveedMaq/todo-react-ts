import { FC, ReactElement } from 'react';

import { Grid } from '@mui/material';
import { TaskArea } from '../components/taskarea/taskarea';
import { Sidebar } from '../components/sidebar/sidebar';

export const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight='100vh' p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
};
