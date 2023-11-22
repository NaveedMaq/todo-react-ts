import { Status } from '../../createTaskForm/enums/Status';
import { ITaskApi } from '../interfaces/ITaskApi';

export const countTasks = (tasks: ITaskApi[], status: Status): number => {
  if (!Array.isArray(tasks)) return 0;

  return tasks.filter((task) => task.status === status).length;
};
