import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone:true,
  imports:[TaskComponent]
})
export class TasksComponent {
    @Input() name?:string;
}
