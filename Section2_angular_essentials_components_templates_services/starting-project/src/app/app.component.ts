import { Component } from '@angular/core';
import {HeaderComponent} from './header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[HeaderComponent]
})
export class AppComponent {


  
}
