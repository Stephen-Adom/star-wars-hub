import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AppState,
  getAllCharacters,
  getAllFilms,
  getAllPlanets,
  getAllSpecies,
  getAllStarships,
  getAllVehicles,
  getLoadingState,
} from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { AppApiActions } from 'src/shared/store/app.actions';
import { LazyLoadEvent } from 'primeng/api';
import { format } from 'date-fns';
import { BASE_URI } from 'src/shared/api.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

const peopleHeader = [
  {
    label: 'Name',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Height',
    value: 'height',
    type: 'number',
  },
  {
    label: 'Mass',
    value: 'mass',
    type: 'number',
  },
  {
    label: 'Hair Color',
    value: 'hair_color',
    type: 'string',
  },
  {
    label: 'Skin Color',
    value: 'skin_color',
    type: 'string',
  },
  {
    label: 'Eye Color',
    value: 'eye_color',
    type: 'string',
  },
  {
    label: 'Gender',
    value: 'gender',
    type: 'string',
  },
];

const filmsHeader = [
  {
    label: 'Title',
    value: 'title',
    type: 'string',
  },
  {
    label: 'Description',
    value: 'opening_crawl',
    type: 'string',
  },
  {
    label: 'Director',
    value: 'director',
    type: 'string',
  },
  {
    label: 'Producer',
    value: 'producer',
    type: 'string',
  },
  {
    label: 'Release Date',
    value: 'release_date',
    type: 'date',
  },
  {
    label: 'Episode ID',
    value: 'episode_id',
    type: 'number',
  },
  {
    label: 'Created At',
    value: 'created',
    type: 'date',
  },
];

const starshipHeader = [
  {
    label: 'Name',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Model',
    value: 'model',
    type: 'string',
  },
  {
    label: 'Starship Class',
    value: 'starship_class',
    type: 'string',
  },
  {
    label: 'Manufacturer',
    value: 'manufacturer',
    type: 'string',
  },
  {
    label: 'Hyperdrive Rating',
    value: 'hyperdrive_rating',
    type: 'number',
  },
  {
    label: 'Total Crew',
    value: 'crew',
    type: 'number',
  },
  {
    label: 'Cargo Capacity',
    value: 'cargo_capacity',
    type: 'number',
  },
];

const vehicleHeader = [
  {
    label: 'Name',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Vehicle Class',
    value: 'vehicle_class',
    type: 'string',
  },
  {
    label: 'Model',
    value: 'model',
    type: 'string',
  },
  {
    label: 'Manufacturer',
    value: 'manufacturer',
    type: 'string',
  },
  {
    label: 'Vehicle Length',
    value: 'length',
    type: 'number',
  },
  {
    label: 'Total Crew',
    value: 'crew',
    type: 'number',
  },
  {
    label: 'Cargo Capacity',
    value: 'cargo_capacity',
    type: 'number',
  },
];

const specieHeader = [
  {
    label: 'Name',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Language',
    value: 'language',
    type: 'string',
  },
  {
    label: 'Classification',
    value: 'classification',
    type: 'string',
  },
  {
    label: 'Average Lifespan',
    value: 'average_lifespan',
    type: 'number',
  },
  {
    label: 'Average Height',
    value: 'average_height',
    type: 'number',
  },
  {
    label: 'Designation',
    value: 'designation',
    type: 'string',
  },
  {
    label: 'Skin Colors',
    value: 'skin_colors',
    type: 'string',
  },
];

const planetHeader = [
  {
    label: 'Name',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Terrain',
    value: 'terrain',
    type: 'string',
  },
  {
    label: 'Population',
    value: 'population',
    type: 'number',
  },
  {
    label: 'Rotation Period',
    value: 'rotation_period',
    type: 'number',
  },
  {
    label: 'Diameter',
    value: 'diameter',
    type: 'number',
  },
  {
    label: 'Climate',
    value: 'climate',
    type: 'string',
  },
  {
    label: 'Gravity',
    value: 'gravity',
    type: 'number',
  },
];

@Component({
  selector: 'app-lister-page',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './lister-page.component.html',
  styleUrls: ['./lister-page.component.scss'],
})
export class ListerPageComponent implements OnInit, OnDestroy {
  @ViewChild('listTable') listTable!: Table;
  categoryList: any[] = [];
  category!: string | null;
  tableHeader: { label: string; value: string }[] = [];
  totalRecords: number = 11;
  loading = false;
  data: any[] = [];
  routeSubscription = new Subscription();
  loadingSubscription = new Subscription();
  dataSubscription = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((data) => {
      this.category = data.get('category');

      switch (this.category) {
        case 'people':
          Object.assign(this.tableHeader, peopleHeader);
          break;
        case 'films':
          Object.assign(this.tableHeader, filmsHeader);
          break;
        case 'planets':
          Object.assign(this.tableHeader, planetHeader);
          break;
        case 'species':
          Object.assign(this.tableHeader, specieHeader);
          break;
        case 'starships':
          Object.assign(this.tableHeader, starshipHeader);
          break;
        case 'vehicles':
          Object.assign(this.tableHeader, vehicleHeader);
          break;
        default:
          Object.assign(this.tableHeader, peopleHeader);
          break;
      }

      this.lazyLoadData({
        first: 0,
        rows: 10,
        sortField: 'name',
        sortOrder: 1,
      });
    });

    this.loadingSubscription = this.store
      .select(getLoadingState)
      .subscribe((state) => {
        this.loading = state;
      });

    this.dataSubscription = this.store
      .select(getAllCharacters)
      .subscribe((data) => {
        if (data) {
          this.totalRecords = data.count;
          this.data = data.results;
          this.cdr.detectChanges();
        }
      });

    this.dataSubscription = this.store.select(getAllFilms).subscribe((data) => {
      if (data) {
        this.totalRecords = data.count;
        this.data = data.results;
        this.cdr.detectChanges();
      }
    });

    this.dataSubscription = this.store
      .select(getAllPlanets)
      .subscribe((data) => {
        if (data) {
          this.totalRecords = data.count;
          this.data = data.results;
          this.cdr.detectChanges();
        }
      });

    this.dataSubscription = this.store
      .select(getAllSpecies)
      .subscribe((data) => {
        if (data) {
          this.totalRecords = data.count;
          this.data = data.results;
          this.cdr.detectChanges();
        }
      });

    this.dataSubscription = this.store
      .select(getAllStarships)
      .subscribe((data) => {
        if (data) {
          this.totalRecords = data.count;
          this.data = data.results;
          this.cdr.detectChanges();
        }
      });

    this.dataSubscription = this.store
      .select(getAllVehicles)
      .subscribe((data) => {
        if (data) {
          this.totalRecords = data.count;
          this.data = data.results;
          this.cdr.detectChanges();
        }
      });
  }

  lazyLoadData(event: LazyLoadEvent) {
    if (this.category) {
      const page = event.first! / event?.rows! + 1;
      this.store.dispatch(AppApiActions.toggleLoading({ state: true }));

      switch (this.category) {
        case 'people':
          this.store.dispatch(
            AppApiActions.fetchAllCharacters({ pageNumber: page })
          );
          break;
        case 'films':
          this.store.dispatch(
            AppApiActions.fetchAllFilms({ pageNumber: page })
          );
          break;
        case 'planets':
          this.store.dispatch(
            AppApiActions.fetchAllPlanets({ pageNumber: page })
          );
          break;
        case 'species':
          this.store.dispatch(
            AppApiActions.fetchAllSpecies({ pageNumber: page })
          );
          break;
        case 'starships':
          this.store.dispatch(
            AppApiActions.fetchAllStarships({ pageNumber: page })
          );
          break;
        case 'vehicles':
          this.store.dispatch(
            AppApiActions.fetchAllVehicles({ pageNumber: page })
          );
          break;
        default:
          this.store.dispatch(
            AppApiActions.fetchAllCharacters({ pageNumber: page })
          );
          break;
      }
    }
  }

  goBack() {
    this.location.back();
  }

  formatDate(date: string) {
    return format(new Date(date), 'PPP');
  }

  viewDetails(info: any) {
    switch (this.category) {
      case 'people':
        this.store.dispatch(
          AppApiActions.displayCharacterDetails({ character: info })
        );
        break;
      case 'films':
        this.store.dispatch(AppApiActions.displayFilmDetails({ film: info }));
        break;
      case 'planets':
        this.store.dispatch(
          AppApiActions.displayPlanetDetails({ planet: info })
        );
        break;
      case 'species':
        this.store.dispatch(
          AppApiActions.displaySpeciesDetails({ species: info })
        );
        break;
      case 'starships':
        this.store.dispatch(
          AppApiActions.displayStarshipDetails({ starship: info })
        );
        break;
      case 'vehicles':
        this.store.dispatch(
          AppApiActions.displayVehicleDetails({ vehicle: info })
        );
        break;
      default:
        this.store.dispatch(
          AppApiActions.displayCharacterDetails({ character: info })
        );
        break;
    }
    const id = info.url.split(BASE_URI + this.category + '/')[1].split('/')[0];
    this.router.navigate([this.category, 'details', id]);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }
}
