import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
  imports:[CommonModule,AsyncPipe],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
    private messagesService=inject(MessagesService);
    messages = this.messagesService.allMessages;
    //async pipe will trigger cahneg detection

    // private cdRef =  inject(ChangeDetectorRef);
    // private destroyRef = inject(DestroyRef)

    // messages:string[]=[];

    // ngOnInit(): void {
    //     const subscription = this.messagesService.messages$.subscribe((messages)=>{
    //         this.messages=messages
    //         this.cdRef.markForCheck();//this will trigger change detection
    //     });

    //     this.destroyRef.onDestroy(()=>{
    //         subscription.unsubscribe();
    //     })
    // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
