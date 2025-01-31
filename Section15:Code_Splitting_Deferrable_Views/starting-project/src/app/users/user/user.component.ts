import { Component, Input, computed } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports:[RouterLink,RouterLinkActive]
})
export class UserComponent {
  @Input({required:true}) user!:User;

  imagePath = computed(() => 'users/' + this.user.avatar);
}
