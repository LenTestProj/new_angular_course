import { Component, computed, inject} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-result',
  templateUrl: './investment-result.component.html',
  styleUrls: ['./investment-result.component.css'],
  standalone:false,
})
export class InvestmentResultComponent {
    private investmentService=inject(InvestmentService);

    results=this.investmentService.resultData.asReadonly();

    // get results(){
    //     return this.investmentService.resultData;
    // }
}
