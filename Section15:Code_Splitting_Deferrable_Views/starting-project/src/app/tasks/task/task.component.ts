import { Component, Input, inject} from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
    @Input({required:true}) task!:Task;
    private tasksService = inject(TasksService);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);    

    onComplete() {
        this.tasksService.removeTask(this.task.id);
        this.router.navigate(['./'],{
            relativeTo: this.activatedRoute,
            queryParamsHandling:'preserve',
            onSameUrlNavigation:'reload' //to call the same route again. because by default it ignores
        })
    }
}
