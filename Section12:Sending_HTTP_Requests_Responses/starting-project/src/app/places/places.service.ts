import { Injectable, inject, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
    private errorService = inject(ErrorService);
    private httpClient = inject(HttpClient);
    private userPlaces = signal<Place[]>([]);

    loadedUserPlaces = this.userPlaces.asReadonly();

    loadAvailablePlaces() {
        return this.fetchPlaces('http://localhost:3000/places','Something went wrong while fetching available places. Please try again later').pipe(catchError(errorResponse=>{
            this.errorService.showError("An error occured while fetching places");

            console.log("Error response is: ",errorResponse);

            return throwError(()=>new Error("An error occured while fetching places"));
        }))    
    }

    loadUserPlaces() {
        return this.fetchPlaces('http://localhost:3000/user-places','Something went wrong while fetching favourite places for the existing user. Please try again later').pipe(tap({
            next:(usrPlaces)=>{
                usrPlaces && this.userPlaces.set (usrPlaces)
            }   
        }))
    }

    addPlaceToUserPlaces(place:Place) {
        // const prevPlaces = this.userPlaces();

        // this.userPlaces.set([...prevPlaces,place])

        return this.httpClient.put('http://localhost:3000/user-places',{placeId:place.id},{observe:'response'}).pipe(tap((response:any)=>{
            const _userPlaces = response.body?.userPlaces;
            this.userPlaces.set(_userPlaces);
        }),catchError(error=>{
            // this.userPlaces.set(prevPlaces);
            this.errorService.showError("Failed to store selected Place")
            return throwError(()=>new Error("Failed to store selected place."))
        }))
    }

    removeUserPlace(place: Place) {
        return this.httpClient.delete('http://localhost:3000/user-places/'+place.id,{observe:'response'}).pipe(tap((response:any)=>{
            const _userPlaces = response.body?.userPlaces;
            this.userPlaces.set(_userPlaces);
        }));
    }

    private fetchPlaces(url:string, errorMessage:string){
        return this.httpClient.get<{places:Place[]}>(url,{
                observe:'response'
            }).pipe(
                map((resData)=>{
                    console.log("res data is: ",resData);
                return resData.body?.places;
                }),
                catchError((error)=>{
                    console.log("catche error is: ",error)
                    return throwError(()=>{
                        return new Error(errorMessage)
                    })
                })
                )  
    }
}
