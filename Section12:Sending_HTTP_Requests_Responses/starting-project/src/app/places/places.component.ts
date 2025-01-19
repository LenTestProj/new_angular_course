import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Place } from './place.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent {
  @Input({required:true}) places:Place[]|undefined;
  @Output() selectPlace = new EventEmitter<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
