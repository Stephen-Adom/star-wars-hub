import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppState, getPlanetDetail } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PlanetType } from 'src/shared/data.types';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  dataId!: string;
  category!: string;
  planetDetailsSubscription = new Subscription();
  planetDetails!: PlanetType;
  routeParamSubscription = new Subscription();
  httpSubscription = new Subscription();

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


    this.planetDetailsSubscription = this.store.select(getPlanetDetail).subscribe((data) => {
      if (data) {
        this.planetDetails = data;
        this.saveVisit();
        console.log('saving visit');
      } else {
        this.fetchPlanetDetails();
      }
    })
  }

  fetchPlanetDetails() {
    this.httpSubscription = this.http.get(BASE_URI + 'planets/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displayPlanetDetails({ planet: data }))
      }
    })
  }

  saveVisit() {
    this.store.dispatch(AppApiActions.updateVisitHistory({
      history: {
        name: this.planetDetails.name,
        category: this.category as string,
        id: parseInt(this.dataId!),
        lastVisited: new Date()
      }
    }));
  }

  ngOnDestroy(): void {
    this.planetDetailsSubscription.unsubscribe();
    this.routeParamSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
  }
}
