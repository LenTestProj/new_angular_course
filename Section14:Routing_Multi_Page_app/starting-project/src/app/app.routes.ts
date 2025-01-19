import { CanMatchFn, Router, Routes, UrlTree } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import {routes as userRoutes} from './users/users.route';
import { resolveUserName } from "./users/users.component";
import { retry } from "rxjs";
import { inject } from "@angular/core";

const dummyCanMatch:CanMatchFn=(route,segments)=>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess){
        return true;
    }
    else{
        return router.parseUrl('/unauthorized');
    }     
}


export const routes:Routes=[
    {
        path:"", //<your-domain>
        component:NoTaskComponent,
        title:"No task Selected" //sets the title for the given route
    },
    {
        path:"users/:userId",  //<your-domain>/users/<uid>
        component:UserTasksComponent,
        children:userRoutes,
        canMatch:[dummyCanMatch],
        data:{
            message:'Hello!'
        },
        resolve:{
            userName:resolveUserName   
        },
    },
    {
        path:'**', //no route is met.. default route
        component:NotFoundComponent
    }
]