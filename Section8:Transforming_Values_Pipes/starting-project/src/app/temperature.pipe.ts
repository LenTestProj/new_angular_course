import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'temp',
    standalone:true
})
export class TemperaturePipe implements PipeTransform{
    transform(value: string|number|null, inputType:'cel'|'fah', outputType?:'cel'|'fah') {
        let val:number,outputTemperature!:number, symbol:'*C' | '*F';

        if(!value){
            return
        }
        if(typeof value === 'string'){
            val=parseFloat(value)
        }
        else{
            val=value;
        }

        if(inputType==='cel' && outputType === 'fah'){
            outputTemperature = val * (9/5) + 32;
        }
        else if(inputType==='fah' && outputType === 'cel'){
            outputTemperature = (val-32) * (5/9);   
        }
        else{
            outputTemperature=val;
        }
        
        if(!outputType){
            symbol = inputType === 'cel' ? '*C':'*F'
        }
        else{
            symbol = inputType === 'cel' ? '*C':'*F'
        }
        return `${outputTemperature.toFixed(2)} *F`;
    }
   
}