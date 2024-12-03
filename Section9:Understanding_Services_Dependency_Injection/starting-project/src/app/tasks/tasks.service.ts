import { Injectable, inject, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// @Injectable({
//     providedIn:'root'
// })
export class TasksService {
    private tasks =signal<Task[]>([]);
    private loggingService = inject(LoggingService);

    allTasks = this.tasks.asReadonly();

    addTask(taskData:{title:string; description:string}){
        const newTask:Task={...taskData,id:Math.random().toString(),
        status:"OPEN"};

        this.tasks.update((oldTasks)=>{
            return [...oldTasks,newTask]
        });
        this.loggingService.log('CHANGE TASK WITH TO '+taskData.title);
    }

    updateTaskStatus(taskId: string, newStatus:TaskStatus){
        this.tasks.update((oldTasks)=>{
            return oldTasks.map((task)=>task.id===taskId?{...task,status:newStatus}:task);
        });
        console.log("this udapted tasks: ",this.tasks())
    }
}