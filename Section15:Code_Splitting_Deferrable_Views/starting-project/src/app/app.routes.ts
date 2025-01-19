import { CanMatchFn, Router, Routes, UrlTree } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { resolveUserName } from "./users/users.component";
import { retry } from "rxjs";
import { inject } from "@angular/core";

const dummyCanMatch:CanMatchFn=(route,segments)=>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    console.log("riute can match ",route);
    console.log("Can match segment ",segments);
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
        path:"users/:userId",
          //<your-domain>/users/<uid>
        component:UserTasksComponent,
        loadChildren:()=>import('../app/users/users.route').then(mod=>mod.routes),
        // children:userRoutes,
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