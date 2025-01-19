import { Component, inject } from '@angular/core';

import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    imports: [UserComponent,CommonModule],
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;
}

export const resolveUserName:ResolveFn<string>=(activatedRoute:ActivatedRouteSnapshot,routerState:RouterStateSnapshot)=>{
    const usersService = inject(UsersService);
    const userName = usersService.users.find((u)=>u.id == activatedRoute.paramMap.get('userId'))?.name || '';
    return userName
}
