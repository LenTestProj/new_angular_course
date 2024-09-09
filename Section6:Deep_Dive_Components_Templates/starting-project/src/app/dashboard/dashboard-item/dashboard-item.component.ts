import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css'],
  standalone:true
})
export class DashboardItemComponent{
    @Input({required:true}) image!:{src:String,alt:String};
    @Input({required:true}) title!:String;
}
