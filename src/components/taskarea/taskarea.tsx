import { FC, ReactElement } from 'react';
import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';

export const TaskArea: FC = (): ReactElement => {
  const queryClient = useQueryClient();

  const { error, isLoading, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      return await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/tasks',
        'GET'
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: IUpdateTask) =>
      sendApiRequest('http://localhost:3200/tasks', 'PUT', data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.IN_PROGRESS : Status.TODO,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    updateTaskMutation.mutate({ id, status: Status.COMPLETED });
  }

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
          <TaskCounter
            status={Status.TODO}
            count={data ? countTasks(data, Status.TODO) : undefined}
          />
          <TaskCounter
            status={Status.IN_PROGRESS}
            count={data ? countTasks(data, Status.IN_PROGRESS) : undefined}
          />
          <TaskCounter
            status={Status.COMPLETED}
            count={data ? countTasks(data, Status.COMPLETED) : undefined}
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          xs={10}
          md={8}
          gap={4}
        >
          {error && (
            <Alert severity='error'>
              There was an error fetching your tasks
            </Alert>
          )}

          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity='warning'>
              You don not have any tasks created yet. Start by creating some
              tasks
            </Alert>
          )}

          {isLoading ? (
            <LinearProgress />
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data.map(
              (task) =>
                task.status !== Status.COMPLETED && (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={new Date(task.date)}
                    description={task.description}
                    priority={task.priority}
                    status={task.status}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                )
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
