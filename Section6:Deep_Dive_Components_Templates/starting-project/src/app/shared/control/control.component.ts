import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, HostListener, Input, ViewEncapsulation, afterNextRender, afterRender, inject } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
  standalone:true,
  host:{
    class:'control',
    '(click)':'onClick()'
  },
  encapsulation:ViewEncapsulation.None //styles will affect correctly to all the inputs
})
export class ControlComponent implements AfterContentInit{
    constructor(){
        
        //gets invoked on any change anywhere in the application not necessary in this component
        afterRender(()=>{
            console.log('after render');
            
        })

        
        afterNextRender(()=>{
            console.log("after next render");
            
        })
    }

    ngAfterContentInit(): void {
      console.log("AFTER CONTENT INIT");
      console.log(this.control?.nativeElement)
    }
    // @HostBinding('class') className = 'control';
    @Input({required:true}) label!:String;
    private el = inject(ElementRef);
    //Host Binding searches for host element with the className and sets the value 'control' for the field class. 

    @ContentChild('input') private control?:ElementRef<HTMLInputElement|HTMLTextAreaElement>;

    onClick(){
        console.log("Clicked");
        console.log(this.el);
        console.log("Content child element is: ",this.control)
    }

    // @HostListener('click') onClick(){
    //     console.log("Clicked");
    // }
}
