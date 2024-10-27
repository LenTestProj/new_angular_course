import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LogDirective } from '../log.directive';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  hostDirectives:[LogDirective]
})
export class AuthComponent {
  email:string = '';
  password:string = '';
  private authService = inject(AuthService);

  onSubmit() {
    console.log("The email and password before submitting are: ",this.email,' and ',this.password)
    this.authService.authenticate(this.email, this.password);
  }
}
