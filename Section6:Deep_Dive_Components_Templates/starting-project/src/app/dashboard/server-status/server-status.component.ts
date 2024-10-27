import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ServerStatusComponent implements OnInit, OnDestroy {
    currentStatus=signal<'online'|'offline'|'unknown'>('offline');
    private interval?:ReturnType<typeof setInterval>;
    private destroyRef = inject(DestroyRef);

    constructor(){
       effect(()=>{
        console.log("Effect function")
        console.log(this.currentStatus()) 
       });
       
       //listen to events that changes. similar to use-effect in react
    }


    ngOnDestroy(): void {
        clearTimeout(this.interval)
    }

    ngOnInit(){
        this.interval = setInterval(()=>{
            const rnd=Math.random();
            if(rnd<0.5){
                this.currentStatus.set('online');
            }
            else if(rnd<0.9){
                this.currentStatus.set('offline')
            }
            else{
                this.currentStatus.set('unknown')
            }
        },2000);

        //alternative to ngOnDestroy
        this.destroyRef.onDestroy(()=>{
        clearInterval(this.interval)
        })
    }
}
