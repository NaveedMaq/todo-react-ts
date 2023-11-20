import { Priority } from '../../createTaskForm/enums/Priority';

export function renderPriorityBorderColor(priority: Priority): string {
  switch (priority) {
    case Priority.NORMAL:
      return 'grey.900';
    case Priority.LOW:
      return 'info.light';
    case Priority.HIGH:
      return 'error.light';
  }
}
