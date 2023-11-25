import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AppState } from 'src/shared/store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent {
  routeSubscription = new Subscription();
  category!: string | null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(data => {
      this.category = data.get('category');
    })
  }

  goBack() {
    this.location.back();
  }
}