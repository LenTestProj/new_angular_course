import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, ResolveFn, Router, RouterLink } from '@angular/router';
import { resolveUserName } from 'src/app/users/users.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @Input({required:true}) userId:string='';
  enteredTitle:string='';
  enteredSummary:string = '';
  enteredDate:string = '';
  submitted:Boolean=false;
  private tasksService = inject(TasksService);
  private router = inject(Router)

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.submitted=true;

    this.router.navigate(['/users',this.userId,'tasks'],{
        replaceUrl: true,   //user cannot go back to this page
    })
  }
}

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