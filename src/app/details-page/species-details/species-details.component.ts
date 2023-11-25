import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PlanetType, SpeciesType } from 'src/shared/data.types';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';
import { AppState, getPlanetDetail, getSpeciesDetail } from 'src/shared/store/app.reducer';

@Component({
  selector: 'app-species-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.scss']
})
export class SpeciesDetailsComponent {
  dataId!: string;
  speciesDetailsSubscription = new Subscription();
  speciesDetails!: SpeciesType;
  homeWorldDetails!: PlanetType;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.dataId = data.get('id')!;
    })


    this.speciesDetailsSubscription = this.store.select(getSpeciesDetail).subscribe((data) => {
      if (data) {
        this.speciesDetails = data;
        this.fetchHomeWorldDetails();
      } else {
        this.fetchSpeciesDetails();
      }
    })
  }


  fetchHomeWorldDetails() {
    this.http.get(this.speciesDetails.homeworld).subscribe((data: any) => {
      if (data) {
        this.homeWorldDetails = data;
      }
    })
  }

  fetchSpeciesDetails() {
    this.http.get(BASE_URI + 'species/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displaySpeciesDetails({ species: data }))
      }
    })
  }
}
