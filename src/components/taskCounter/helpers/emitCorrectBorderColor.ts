import { Status } from '../../createTaskForm/enums/Status';

export function emitCorrectBorderColor(status: Status): string {
  switch (status) {
    case Status.TODO:
      return 'error.light';
    case Status.IN_PROGRESS:
      return 'warning.light';
    case Status.COMPLETED:
      return 'success.light';
  }
}
