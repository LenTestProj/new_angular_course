import { Directive, ElementRef, Input, inject } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector:'a[appSafeLink]', //targets anchor tag with appSafeLink Selector
    standalone:true,
    host:{
        '(click)':'onConfirmLeavePage($event)'
    },
    hostDirectives:[LogDirective]
})
export class SafeLinkDirective {
    @Input() queryParam:string='my app';
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log("Safe link directive is active")
    }

    onConfirmLeavePage(event:MouseEvent){
        const wantsToLeave = window.confirm("Do you want to leave the app?");

        if(wantsToLeave){
            // const address = (event.target as HTMLAnchorElement).href;
            // (event.target as HTMLAnchorElement).href = address + '?from='+this.queryParam

            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from='+this.queryParam

            return;
        }

        event.preventDefault();
    }
}