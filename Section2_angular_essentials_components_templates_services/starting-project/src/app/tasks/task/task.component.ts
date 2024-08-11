import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {type Task} from './task.model';
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TasksSevice } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone:true,
  imports: [CardComponent,DatePipe]
})
export class TaskComponent {
    @Input({required:true}) task!:Task;
    taskService=inject(TasksSevice);

    onCompleteTask(){
       this.taskService.removeTask(this.task.id)
    }
}
