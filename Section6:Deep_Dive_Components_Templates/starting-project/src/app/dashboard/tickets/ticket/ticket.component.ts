import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class TicketComponent {
    @Input({required:true}) data!:Ticket;
    detailsVisible = signal(false);
    @Output() close = new EventEmitter();

    onToggleVisible(){
        // this.detailsVisible.set(!this.detailsVisible())
        this.detailsVisible.update((prev)=>{
            return !prev
        })
    }

    onMarkAsCompleted(){
        this.close.emit()
    }
}
