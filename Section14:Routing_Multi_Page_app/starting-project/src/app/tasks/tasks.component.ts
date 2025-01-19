import {
    Component,
    inject,
    Input,
  } from '@angular/core';
  import { CanDeactivateFn, ResolveFn, RouterLink } from '@angular/router';
  
  import { TaskComponent } from './task/task.component';
  import { TasksService } from './tasks.service';
  import { Task } from './task/task.model';
import { CommonModule } from '@angular/common';
import { resolveUserName } from '../users/users.component';
import { NewTaskComponent } from './new-task/new-task.component';
  
  @Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    imports: [TaskComponent, RouterLink,CommonModule],
  })
  export class TasksComponent {
    @Input({required:true}) userTasks!:Task[];

    @Input({required:true}) userId:string='';

    @Input({required:true}) order:'asc'|'desc'='desc';
  }
  
  export const resolveUserTasks: ResolveFn<Task[]> = (
    activatedRouteSnapshot,
    routerState
  ) => {
    const order = activatedRouteSnapshot.queryParams['order'];
    const tasksService = inject(TasksService);
    const tasks = tasksService
      .allTasks()
      .filter(
        (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
      );
  
    if (order && order === 'asc') {
      tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
      tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }
  
    return tasks.length ? tasks : [];
  };

  export const resolveTitle:ResolveFn<string> = (activatedRoute, routerState) =>{
    return resolveUserName(activatedRoute, routerState) + '\'s Tasks'
  } 

  export const canLeaveEditPage:CanDeactivateFn<NewTaskComponent>=(component)=>{
    if(component.submitted){
        return true;
    }
    if(component.enteredTitle || component.enteredDate || component.enteredSummary){
        return window.confirm("Do you really want to leave?. You will lose the entered data")
    }
    return true;
  }