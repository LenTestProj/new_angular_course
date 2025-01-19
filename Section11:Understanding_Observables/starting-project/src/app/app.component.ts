import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import {Observable, interval, map} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    clickCount = signal(0);
    clickCount$ = toObservable(this.clickCount);//used to convert signal to observable
    interval$ = interval(1000);
    intervalSignal = toSignal(this.interval$,{initialValue:0});
    customInterval$ = new Observable((subscriber)=>{
        let timesExecuted = 0;
        const interval = setInterval(()=>{
            if(timesExecuted>3){
                clearInterval(interval);
                subscriber.complete();
                return;
            }
            console.log("emitting new value");
            subscriber.next({message:'New value'});
            timesExecuted++;
        },2000);
    });

    // interval = signal(0);
    // doubleInterval = computed(()=>this.interval()*2);
    private destroyRef = inject(DestroyRef);

    constructor(){
        //this function gets called whenever any signal value changes
        // effect(()=>{
        //     console.log(`Clicked button ${this.clickCount()} times`)
        // })

        
    }

    ngOnInit(): void {
        // setInterval(()=>{
        //     this.interval.update(prevIntervalNumber=>prevIntervalNumber+1);
        // },1000)
        // const subscription = interval(1000).pipe(map((val:number)=>val*2)).subscribe({
        //     next:(val)=>{
        //         console.log(val);
        //     }
        // }); 

        // //this function gets called when the component is destroyed
        // this.destroyRef.onDestroy(()=>{
        //     subscription.unsubscribe();
        // }) 
        this.customInterval$.subscribe({
            next:(val)=>{
                console.log(val)
            },
            complete:()=>{
                console.log("COMPLETED");
            }
        })
        const subscription = this.clickCount$.subscribe({
            next:(val)=>{
                console.log(`Clicked button ${this.clickCount()} times`)    
            }
        }) 
        
        this.destroyRef.onDestroy(()=>{
            subscription.unsubscribe();
        })
    }

    onClick(){
        this.clickCount.update(prevCount=>prevCount+1);
    }
}
