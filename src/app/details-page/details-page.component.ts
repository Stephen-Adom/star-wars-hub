import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AppState } from 'src/shared/store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    CharacterDetailsComponent,
    FilmsDetailsComponent,
    PlanetDetailsComponent,
    SpeciesDetailsComponent,
    StarshipDetailsComponent,
    VehicleDetailsComponent
  ],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  routeSubscription = new Subscription();
  category!: string | null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((data) => {
      this.category = data.get('category');
    });
  }

  goBack() {
    this.location.back();
  }
}
