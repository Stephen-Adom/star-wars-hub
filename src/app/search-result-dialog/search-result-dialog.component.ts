import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SearchResultService } from 'src/shared/search-result-data.service';
import { PeopleType, searchResponseType } from 'src/shared/data.types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';
import { AppState } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-result-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './search-result-dialog.component.html',
  styleUrls: ['./search-result-dialog.component.scss']
})
export class SearchResultDialogComponent implements OnInit, OnDestroy {
  visible = true;
  result!: searchResponseType;
  resultSubscription = new Subscription();
  visibilitySubscription = new Subscription();

  constructor(
    private resultservice: SearchResultService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.visibilitySubscription = this.resultservice.toggleDialogVisibilityObservable.subscribe(data => {
      this.visible = data;
    })

    this.resultSubscription = this.resultservice.resultDataObservable.subscribe(data => {
      if (data) {
        this.result = data;
      }
    })
  }

  onHide() {
    this.resultservice.toggleDialogVisibility(false);
  }

  viewDetails(info: PeopleType) {
    this.store.dispatch(
      AppApiActions.displayCharacterDetails({ character: info })
    );
    const id = info.url.split(BASE_URI + 'people/')[1].split('/')[0];
    this.router.navigate(["people", "details", id]);
    this.onHide();
  }

  ngOnDestroy(): void {
    this.visibilitySubscription.unsubscribe();
    this.resultSubscription.unsubscribe();
  }
}
