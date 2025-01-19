import { Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
  imports:[RouterOutlet,RouterLink]
})
export class UserTasksComponent implements OnInit{

    @Input({required:true}) message:string='';
    @Input({required:true}) userId:string='';
    @Input({required:true}) userName:string='';

    // private userService = inject(UsersService);
    private activatedRoute = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.activatedRoute.data.subscribe({
            next:data=>{
                console.log(data,"data routes..")   
            }
        })    
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     this.userName = this.userService.users.find(u=>u.id===this.userId)?.name;
    // }

    // ngOnInit(): void {
    //     console.log(this.activatedRoute,"Acrtivated route"); 
    //     console.log("Input data message is: ",this.message);
    //     const subscription = this.activatedRoute.paramMap.subscribe({
    //         next:paramMap=>{
    //           this.userName = this.userService.users.find(u=>u.id === paramMap.get('userId'))?.name  
    //         }
    //     });
        
    //     this.destroyRef.onDestroy(()=>subscription.unsubscribe());
    // }

}
