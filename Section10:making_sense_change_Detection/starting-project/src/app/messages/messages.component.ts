import { ChangeDetectionStrategy, Component,} from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection:ChangeDetectionStrategy.OnPush //this will only change if there is a change in event in this component or sub component. but if there is a change in this component it will tracew the changes back to the parent. so all the component s will get affected
})
export class MessagesComponent {
  

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

}
