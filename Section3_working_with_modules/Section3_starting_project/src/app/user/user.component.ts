import { Component,EventEmitter,Input,Output,computed,signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length);
import {type User} from './user.model'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone:false,
})
export class UserComponent {
    @Input({required:true}) user!:User;
    @Input({required:true}) selected!: Boolean;
    @Output() select=new EventEmitter<string>();

    get imagePath(){
        return 'assets/users/'+this.user.avatar    
    }

    onSelectUser(){
        this.select.emit(this.user.id);      
    }
}
