import { Routes } from '@angular/router';

import { TasksComponent, canLeaveEditPage, resolveTitle, resolveUserTasks } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
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
];