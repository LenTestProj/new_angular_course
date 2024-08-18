import { Component,Input, inject } from '@angular/core';
import {type Task} from './task.model';
import { DatePipe } from '@angular/common'; //this is imported by the vrowser module so no need to import explicitely
import { TasksSevice } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone:false,
})
export class TaskComponent {
    @Input({required:true}) task!:Task;
    taskService=inject(TasksSevice);

    onCompleteTask(){
       this.taskService.removeTask(this.task.id)
    }
}
