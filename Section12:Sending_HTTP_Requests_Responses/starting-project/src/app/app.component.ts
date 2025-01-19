import { Component, OnInit, inject } from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './shared/error.service';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from "./shared/modal/error-modal/error-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AvailablePlacesComponent, UserPlacesComponent, CommonModule, ErrorModalComponent],
})
export class AppComponent implements OnInit{
    private errorService = inject(ErrorService);

    error = this.errorService.error;

   ngOnInit(): void {
       console.log("Error ",this.error());
   }
}
