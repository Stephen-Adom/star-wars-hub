import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState, getCharacterDetail } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { PeopleType, PlanetType, SpeciesType, StarshipType, VehicleType } from 'src/shared/data.types';
import { HttpClient } from '@angular/common/http';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  characterDetails!: PeopleType;
  dataId!: string;
  category!: string;
  homeWorldDetails!: PlanetType;
  species: SpeciesType[] = [];
  starships: StarshipType[] = [];
  vehicles: VehicleType[] = [];
  routeSubscription: Subscription | null = new Subscription();
  characterDetailSubscription: Subscription | null = new Subscription();
  httpSubscription: Subscription | null = new Subscription();
  httpHomeworldSubscription: Subscription | null = new Subscription();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(data => {
      this.dataId = data.get('id')!;
      this.category = data.get('category')!;
    })


    this.characterDetailSubscription = this.store.select(getCharacterDetail).subscribe((data) => {
      if (data) {
        this.characterDetails = data;
        this.saveVisit();
        this.fetchHomeWorldDetails();
        this.fetchSpecies();
        this.fetchStarshipDetails();
        this.fetchVehicleDetails();
      } else {
        this.fetchCharacterDetails();
      }
    })
  }

  fetchCharacterDetails() {
    this.httpSubscription = this.http.get(BASE_URI + 'people/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displayCharacterDetails({ character: data }))
      }
    })
  }

  fetchHomeWorldDetails() {
    this.httpHomeworldSubscription = this.http.get(this.characterDetails.homeworld).subscribe((data: any) => {
      if (data) {
        this.homeWorldDetails = data;
      }
    })
  }

  fetchSpecies() {
    if (this.characterDetails.species.length) {
      this.characterDetails.species.forEach(species => {
        this.http.get(species).subscribe((data: any) => {
          if (data) {
            this.species.push(data);
          }
        })
      })
    }
  }

  fetchStarshipDetails() {
    if (this.characterDetails.starships.length) {
      this.characterDetails.starships.forEach(starship => {
        this.http.get(starship).subscribe((data: any) => {
          if (data) {
            this.starships.push(data);
          }
        })
      })
    }
  }

  fetchVehicleDetails() {
    if (this.characterDetails.vehicles.length) {
      this.characterDetails.vehicles.forEach(vehicle => {
        this.http.get(vehicle).subscribe((data: any) => {
          if (data) {
            this.vehicles.push(data);
          }
        })
      })
    }
  }

  saveVisit() {
    this.store.dispatch(AppApiActions.updateVisitHistory({
      history: {
        name: this.characterDetails.name,
        category: this.category as string,
        id: parseInt(this.dataId!),
        lastVisited: new Date()
      }
    }));
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.characterDetailSubscription?.unsubscribe();
    this.httpSubscription?.unsubscribe();
    this.httpHomeworldSubscription?.unsubscribe();
  }
}
