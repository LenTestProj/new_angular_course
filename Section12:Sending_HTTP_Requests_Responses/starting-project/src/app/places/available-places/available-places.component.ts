import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {PlacesService} from '../places.service'
import { catchError, map, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrls: ['./available-places.component.css'],
  imports: [PlacesComponent, PlacesContainerComponent,CommonModule],
})
export class AvailablePlacesComponent implements OnInit {
    places = signal<Place[] | undefined>(undefined);
    isFetching=signal(false);
    error=signal('');
    private httpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef);
    private placesService = inject(PlacesService)

    ngOnInit(): void {
        const subscription = this.placesService.loadAvailablePlaces().subscribe({next:(response)=>{
                this.places.set(response);
        },complete:()=>{
            this.isFetching.set(false);
        },error:(error:Error)=>{
            console.log("error occured while fetching places are: ",error);
            this.error.set(error.message)
        }});

        this.destroyRef.onDestroy(()=>{
            subscription.unsubscribe();
        })
    }

    onSelectPlace(selectedPlace:Place){
        const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({next:(responseData)=>{
            console.log("on select place response data: ",responseData);
        }});
        
        this.destroyRef.onDestroy(()=>{
            subscription.unsubscribe()
        })
    }
}
