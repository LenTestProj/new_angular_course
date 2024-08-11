import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';
import { TasksSevice } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  standalone:true,
  imports:[FormsModule]
})
export class NewTaskComponent {
    @Input({required:true}) userId!:string;
    @Output() close=new EventEmitter<void>();

    // enteredTitle=signal('');
    // enteredSummary=signal('');
    // enteredDate=signal('');
    enteredTitle='';
    enteredSummary='';
    enteredDate='';
    private tasksService = inject(TasksSevice);

    onCancel(){
        this.close.emit();
    }

    onSubmit(){
        this.tasksService.addTask({
            title:this.enteredTitle,
            summary:this.enteredSummary,
            date:this.enteredDate
        },this.userId);
        this.close.emit();
    }
}
