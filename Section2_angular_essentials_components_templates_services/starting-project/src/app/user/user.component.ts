import { Component,EventEmitter,Input,Output,computed,signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone:true
})
export class UserComponent {
    @Input({required:true}) id!: string;
    @Input({required:true}) avatar!:string;
    @Input({required:true}) name!:string;
    @Output() select=new EventEmitter<string>();

    get imagePath(){
        return 'assets/users/'+this.avatar    
    }

    onSelectUser(){
        this.select.emit(this.id);      
    }
}
