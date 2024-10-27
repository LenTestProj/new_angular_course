import { Injectable, signal } from '@angular/core';

import { Permission } from './auth.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private permissionSubject = new BehaviorSubject<Permission>("guest");
    permissionChanges:Observable<Permission> = this.permissionSubject.asObservable();

    activePermission:Permission = 'guest';

    authenticate(email: string, password: string) {
        console.log(email, password);
        if (email === 'admin@example.com' && password === 'admin') {
            this.activePermission = 'admin';
            this.permissionSubject.next('admin');
        } else if (email === 'user@example.com' && password === 'user') {
            this.activePermission = 'user';
            this.permissionSubject.next('user');
        } else {
            this.permissionSubject.next('guest');
            this.activePermission = 'guest';
        }
    }

    logout() {
        this.activePermission = 'guest';
    }
}
