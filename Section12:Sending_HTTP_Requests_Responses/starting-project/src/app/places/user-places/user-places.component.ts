import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, subscribeOn, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrls: ['./user-places.component.css'],
  imports: [PlacesContainerComponent, PlacesComponent,CommonModule],
})
export class UserPlacesComponent implements OnInit{
    isFetching=signal(false);
    error=signal('');
    private httpClient = inject(HttpClient);
    private placesService = inject(PlacesService)
    private destroyRef = inject(DestroyRef);
    places = this.placesService.loadedUserPlaces;

    ngOnInit(): void {
        this.isFetching.set(true);
        const subscription = this.placesService.loadUserPlaces().subscribe({complete:()=>{
            this.isFetching.set(false);
        },error:(error:Error)=>{
            console.log("error occured while fetching places are: ",error);
            this.error.set(error.message)
        }});

        this.destroyRef.onDestroy(()=>{
            subscription.unsubscribe();
        })
    }

    onRemovePlace(place:Place){
        const subscription = this.placesService.removeUserPlace(place).subscribe();

        this.destroyRef.onDestroy(()=>{
            subscription.unsubscribe();
        })
    }

}
