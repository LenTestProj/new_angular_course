import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TASK_STATUS_OPTIONS, Task, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';
import { TasksServiceToken } from 'src/main';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  private tasksService = inject(TasksServiceToken);
  
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
    

  @Input({required:true}) task!:Task;
  taskStatus:String='';

  ngOnInit(): void {
    switch (this.task.status) {
            case 'OPEN':
                this.taskStatus= 'Open';
                break;
            case 'IN_PROGRESS':
                this.taskStatus= 'Working on it';
                break;
            case 'DONE':
                this.taskStatus= 'Completed';
                break;
            default:
                this.taskStatus= 'Open';
          }
}

//   

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
