import { Component } from '@angular/core';

import { OfferPreviewComponent } from '../offer-preview/offer-preview.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [OfferPreviewComponent],
})
export class WelcomeComponent {}
