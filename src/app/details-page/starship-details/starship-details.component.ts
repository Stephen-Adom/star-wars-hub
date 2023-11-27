import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BASE_URI } from 'src/shared/api.service';
import { StarshipType } from 'src/shared/data.types';
import { AppApiActions } from 'src/shared/store/app.actions';
import { AppState, getStarshipDetail } from 'src/shared/store/app.reducer';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit, OnDestroy {
  dataId!: string;
  category!: string;
  starshipDetailsSubscription: Subscription | null = new Subscription();
  starshipDetails!: StarshipType;
  routeParamSubscription: Subscription | null = new Subscription();
  httpSubscription: Subscription | null = new Subscription();

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


    this.starshipDetailsSubscription = this.store.select(getStarshipDetail).subscribe((data) => {
      if (data) {
        this.starshipDetails = data;
        this.saveVisit();
      } else {
        this.fetchStarshipDetails();
      }
    })
  }

  fetchStarshipDetails() {
    this.httpSubscription = this.http.get(BASE_URI + 'starships/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displayStarshipDetails({ starship: data }))
      }
    })
  }

  saveVisit() {
    this.store.dispatch(AppApiActions.updateVisitHistory({
      history: {
        name: this.starshipDetails.name,
        category: this.category as string,
        id: parseInt(this.dataId!),
        lastVisited: new Date()
      }
    }));
  }

  ngOnDestroy(): void {
    this.starshipDetailsSubscription?.unsubscribe()
    this.routeParamSubscription?.unsubscribe()
    this.httpSubscription?.unsubscribe()
  }
}
