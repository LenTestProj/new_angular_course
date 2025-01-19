import { ResolveFn, Routes } from '@angular/router';

// import { canLeaveEditPage, resolveTitle, resolveUserTasks } from '../tasks/tasks.component';
import { NewTaskComponent, canLeaveEditPage, resolveTitle } from '../tasks/new-task/new-task.component';
import { TasksComponent,resolveUserTasks } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';



export const routes: Routes = [
  {
    path:"",
    providers:[TasksService],
    children:[
        {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full',
          },
          {
            path: 'tasks', // <your-domain>/users/<uid>/tasks
            component:TasksComponent,
            runGuardsAndResolvers:'always', //this cahneg will allow resolver to run when routes or query parameters change
            resolve: {
              userTasks: resolveUserTasks,
            },
            title:resolveTitle
          },
          {
            path: 'tasks/new',
            component: NewTaskComponent,
            canDeactivate:[canLeaveEditPage]
          },
    ]
  }
];
