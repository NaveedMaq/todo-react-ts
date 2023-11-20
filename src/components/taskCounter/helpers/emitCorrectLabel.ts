import { Status } from '../../createTaskForm/enums/Status';

export function emitCorrectLabel(status: Status): string {
  switch (status) {
    case Status.TODO:
      return 'Todos';
    case Status.IN_PROGRESS:
      return 'In Progress';
    case Status.COMPLETED:
      return 'Completed';
  }
}
