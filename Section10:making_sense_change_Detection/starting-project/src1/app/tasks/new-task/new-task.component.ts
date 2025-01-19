import { Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from 'src/main'; 

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
    @ViewChild('form') formEl!:ElementRef<HTMLFormElement>;

    constructor(@Inject(TasksServiceToken) private tasksService: TasksService) { }


    onAddTask(title: string, description: string) {
        const taskData={title,description};
        this.tasksService.addTask(taskData);

        this.formEl.nativeElement.reset();
    }
}
