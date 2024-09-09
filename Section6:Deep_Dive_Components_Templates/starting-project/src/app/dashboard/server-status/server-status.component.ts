import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ServerStatusComponent {
    currentStatus='online';
}
