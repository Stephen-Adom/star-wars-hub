import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, last, map, takeLast } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URI } from 'src/shared/api.service';
import { searchResponseType } from 'src/shared/data.types';
import { SearchResultService } from 'src/shared/search-result-data.service';
import { AppState, getVisitHistory } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  searching = false;
  recentHistories$!: Observable<{
    name: string,
    category: string,
    id: number,
    lastVisited: Date
  }[]>

  constructor(
    private resultservice: SearchResultService,
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.recentHistories$ = this.store.select(getVisitHistory).pipe(
      map(histories => histories.slice(0, 3))
    )

    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(800),
      distinctUntilChanged(),
      map((event: Event) => {
        return (event.target as HTMLInputElement).value
      })
    ).subscribe(value => {
      console.log(value, 'value');
      this.searchCharacter(value);
    })
  }

  searchCharacter(search: string) {
    this.searching = true;
    this.http.get<searchResponseType>(`${BASE_URI}/people/?search=${search}`).subscribe({
      next: (result: any) => {
        if (result.count > 0) {
          this.resultservice.sendResult(result);
          this.resultservice.toggleDialogVisibility(true);
        } else {

        }
      },
      complete: () => {
        this.searching = false;
        this.searchInput.nativeElement.value = "";
      }
    })
  }

  viewCharacters() {
    this.router.navigate(['people/list'])
  }

  viewDetails(history: {
    name: string,
    category: string,
    id: number,
    lastVisited: Date
  }) {
    this.router.navigate([history.category, "details", history.id]);
  }
}
