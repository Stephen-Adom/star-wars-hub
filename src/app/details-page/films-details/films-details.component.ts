import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppState, getFilmDetail } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { FilmType } from 'src/shared/data.types';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';

@Component({
  selector: 'app-films-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films-details.component.html',
  styleUrls: ['./films-details.component.scss'],
})
export class FilmsDetailsComponent implements OnInit, OnDestroy {
  dataId!: string;
  category!: string;
  filmDetails!: FilmType;
  filmDetailsSubscription: Subscription | null = new Subscription();
  routeParamSubscription: Subscription | null = new Subscription();
  httpSubscription: Subscription | null = new Subscription();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.subscribe((data) => {
      this.dataId = data.get('id')!;
      this.category = data.get('category')!;
    });

    this.filmDetailsSubscription = this.store
      .select(getFilmDetail)
      .subscribe((data) => {
        if (data) {
          this.filmDetails = data;
          this.saveVisit();
        } else {
          this.fetchFilmDetails();
        }
      });
  }

  fetchFilmDetails() {
    this.httpSubscription = this.http
      .get(BASE_URI + 'films/' + this.dataId)
      .subscribe((data: any) => {
        if (data) {
          this.store.dispatch(AppApiActions.displayFilmDetails({ film: data }));
        }
      });
  }

  formatDate(date: string) {
    return format(new Date(date), 'PPP');
  }

  ngOnDestroy(): void {
    this.filmDetailsSubscription?.unsubscribe();
    this.httpSubscription?.unsubscribe();
    this.routeParamSubscription?.unsubscribe();
  }

  saveVisit() {
    this.store.dispatch(
      AppApiActions.updateVisitHistory({
        history: {
          name: this.filmDetails.title,
          category: this.category as string,
          id: parseInt(this.dataId!),
          lastVisited: new Date(),
        },
      })
    );
  }
}
