import { Component } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WelcomeComponent],
})
export class AppComponent {}
