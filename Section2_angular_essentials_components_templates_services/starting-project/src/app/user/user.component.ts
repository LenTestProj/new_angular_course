import { Component,EventEmitter,Input,Output,computed,signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length);

// type User={
//     id:string;
//     avatar:string;
//     name:string;
// }

interface User {
    id:string;
    avatar:string;
    name:string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone:true
})
export class UserComponent {
    @Input({required:true}) user!:User;
    @Output() select=new EventEmitter<string>();

    get imagePath(){
        return 'assets/users/'+this.user.avatar    
    }

    onSelectUser(){
        this.select.emit(this.user.id);      
    }
}
