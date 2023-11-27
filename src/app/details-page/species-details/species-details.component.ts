import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SpeciesDetailsComponent implements OnInit, OnDestroy {
  dataId!: string;
  category!: string;
  speciesDetailsSubscription = new Subscription();
  speciesDetails!: SpeciesType;
  homeWorldDetails!: PlanetType;
  routeParamSubscription = new Subscription();
  httpSpeciesSubscription = new Subscription();
  httpHomeworldSubscription = new Subscription();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.subscribe(data => {
      this.dataId = data.get('id')!;
      this.category = data.get('category')!
    })


    this.speciesDetailsSubscription = this.store.select(getSpeciesDetail).subscribe((data) => {
      if (data) {
        this.speciesDetails = data;
        this.saveVisit();
        this.fetchHomeWorldDetails();
      } else {
        this.fetchSpeciesDetails();
      }
    })
  }


  fetchHomeWorldDetails() {
    this.httpHomeworldSubscription = this.http.get(this.speciesDetails.homeworld).subscribe((data: any) => {
      if (data) {
        this.homeWorldDetails = data;
      }
    })
  }

  fetchSpeciesDetails() {
    this.httpSpeciesSubscription = this.http.get(BASE_URI + 'species/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displaySpeciesDetails({ species: data }))
      }
    })
  }

  saveVisit() {
    this.store.dispatch(AppApiActions.updateVisitHistory({
      history: {
        name: this.speciesDetails.name,
        category: this.category as string,
        id: parseInt(this.dataId!),
        lastVisited: new Date()
      }
    }));
  }

  ngOnDestroy(): void {
    this.speciesDetailsSubscription.unsubscribe();
    this.routeParamSubscription.unsubscribe();
    this.httpSpeciesSubscription.unsubscribe();
    this.httpHomeworldSubscription.unsubscribe();
  }
}
