import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { ControlComponent } from 'src/app/shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
  standalone:true,
  imports:[ButtonComponent,ControlComponent,FormsModule]
})
export class NewTicketComponent implements OnInit,AfterViewInit {

    enteredTitle='';
    enteredText='';
    //In this lifecycle method you are not guaranteed to recieve the element via ViewChild decorator
    ngOnInit(): void {
        console.log('ON INIT');
        console.log("Form native element on Init is: ",this.form?.nativeElement);
    }

    //In this lifecycle you are guaranteed to recieve the element via ViewChild decorator 
    ngAfterViewInit(): void {
       console.log("AFTER VIEW INIT");
       console.log("Form native element after View Init is: ",this.form?.nativeElement);
    }
    
    @Output() add = new EventEmitter<{title:string;text:string}>();
 
    @ViewChild('form') private form?:ElementRef<HTMLFormElement>; //search element with template variable name 'form'

    onSubmit(){
        this.add.emit({title:this.enteredTitle, text:this.enteredText});

        this.enteredTitle='';
        this.enteredText='';
        // this.form?.nativeElement?.reset();  
    }
}
