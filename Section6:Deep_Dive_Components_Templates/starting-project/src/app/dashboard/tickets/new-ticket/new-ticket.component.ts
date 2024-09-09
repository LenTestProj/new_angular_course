import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/button/button.component';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
  standalone:true,
  imports:[ButtonComponent]
})
export class NewTicketComponent {

}
