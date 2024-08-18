import { Component, Input } from '@angular/core';
import { TasksSevice } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone:false
})
export class TasksComponent {
    @Input({required:true}) userId!:string; 
    @Input({required:true}) name!:string;
    isAddingTask=false;

    constructor(private  taskService:TasksSevice){
    }

    get selectedUserTasks(){
        return this.taskService.getUserTasks(this.userId)
    }

    onStartAddTask(){
        this.isAddingTask=true;
    }

    onClosedAddTask(){
        this.isAddingTask=false;
    }
}
