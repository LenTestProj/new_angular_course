import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent {
//   @Output() add = new EventEmitter();
    private messagesService = inject(MessagesService);
    enteredText:string='';

    get debugOutput() {
        console.log('[NewMessage] "debugOutput" binding re-evaluated.');
        return 'NewMessage Component Debug Output';
    }

    onSubmit() {
        this.messagesService.addMessage(this.enteredText);
        this.enteredText='';
    }
}
