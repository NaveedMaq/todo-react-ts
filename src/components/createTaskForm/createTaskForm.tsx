import { FC, ReactElement, useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskarea/interfaces/ICreateTask';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Status>(Status.TODO);
  const [priority, setPriority] = useState<Priority>(Priority.NORMAL);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const createTaskMutation = useMutation({
    mutationFn: (data: ICreateTask) =>
      sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  });

  const { isPending, isSuccess } = createTaskMutation;

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTitle(undefined);
      setDescription(undefined);
      setDate(new Date());
      setStatus(Status.TODO);
      setPriority(Priority.NORMAL);
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 7 * 1000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [isSuccess]);

  function createTaskHandler() {
    if (!title || !date || !description) return;

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity='success' sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}

      <Typography mb={2} component={'h2'} variant='h6'>
        Create A Task
      </Typography>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          value={title}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          value={description}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={isPending}
        />

        <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
          <TaskSelectField
            label='Status'
            name='status'
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            items={[
              { value: Status.TODO, label: Status.TODO.toUpperCase() },
              {
                value: Status.IN_PROGRESS,
                label: Status.IN_PROGRESS.toUpperCase(),
              },
            ]}
            disabled={isPending}
          />
          <TaskSelectField
            label='Priority'
            name='priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            items={[
              { value: Priority.LOW, label: Priority.LOW.toUpperCase() },
              { value: Priority.NORMAL, label: Priority.NORMAL.toUpperCase() },
              { value: Priority.HIGH, label: Priority.HIGH.toUpperCase() },
            ]}
            disabled={isPending}
          />
        </Stack>
        {isPending && <LinearProgress />}
        <Button
          disabled={
            !title || !description || !date || !status || !priority || isPending
          }
          onClick={createTaskHandler}
          variant='contained'
          size='large'
          fullWidth
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
