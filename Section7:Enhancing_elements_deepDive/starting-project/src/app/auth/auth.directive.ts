import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appAuth]',
  standalone:true
})
export class AuthDirective implements OnInit,OnDestroy{
    @Input({required:true,alias:"appAuth"}) userType!:Permission;
    private authService = inject(AuthService);
    private subscription!:Subscription;
    private templateRef = inject(TemplateRef); //ng-template wrapper.
    private viewContainerRef = inject(ViewContainerRef);

    constructor() { 
        
    }

    ngOnInit(): void {
        //    this.updateVisibility();
           this.subscription = this.authService.permissionChanges.subscribe(()=>{
            this.updateVisibility();
           })
           // Subscribe to permission changes
        
    }

    private updateVisibility():void{
        if(this.authService.activePermission === this.userType){
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else{
            this.viewContainerRef.clear()
        }
    }

    ngOnDestroy(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }        
    }
}
