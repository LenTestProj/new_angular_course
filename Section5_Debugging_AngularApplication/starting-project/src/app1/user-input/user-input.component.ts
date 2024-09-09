import { Component, signal } from '@angular/core';
import { InvestmentService } from '../investment.service';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  standalone:false,
})
export class UserInputComponent {

    constructor(private investmetService:InvestmentService) {}

    enteredInitialInvestment=signal<String|Number>('0');
    enteredAnnualInvestment=signal<String|Number>('0');
    enteredExpectedReturn=signal<String|Number>('5');
    enteredDuration=signal<String|Number>('10');

    onInitialInvestmentChange(event: Event) {
        const value = +(event.target as HTMLInputElement).value;
        this.enteredInitialInvestment.set(value);
    }
    
    onAnnualInvestmentChange(event: Event) {
        const value = +(event.target as HTMLInputElement).value;
        this.enteredAnnualInvestment.set(value);
      }
    
    onExpectedReturnChange(event: Event) {
        const value = +(event.target as HTMLInputElement).value;
        this.enteredExpectedReturn.set(value);
    }
    
    onDurationChange(event: Event) {
        const value = +(event.target as HTMLInputElement).value;
        this.enteredDuration.set(value);
    }

    onSubmit(){
        // console.log(this.enteredAnnualInvestment())
        this.investmetService.calculateInvestmentResults({
            initialInvestment:Number(this.enteredInitialInvestment()),
            duration:Number(this.enteredDuration()),
            expectedReturn:Number(this.enteredExpectedReturn()),
            annualInvestment:Number(this.enteredAnnualInvestment())
        })
       

        // this.enteredInitialInvestment.set('0');
        // this.enteredAnnualInvestment.set('0');
        // this.enteredExpectedReturn.set('5');
        // this.enteredDuration.set('10');
    }
}
