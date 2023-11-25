import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppState, getAllCharacters } from 'src/shared/store/app.reducer';
import { Store } from '@ngrx/store';
import { AppApiActions } from 'src/shared/store/app.actions';
import { LazyLoadEvent } from 'primeng/api';


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
  }
]

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
  }
]

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
  }
]

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
  }
]

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
  }
]

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
  }
]

@Component({
  selector: 'app-lister-page',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './lister-page.component.html',
  styleUrls: ['./lister-page.component.scss']
})
export class ListerPageComponent implements OnInit, OnDestroy {
  @ViewChild('listTable') listTable!: Table;
  categoryList: any[] = [];
  routeSubscription = new Subscription();
  category!: string | null;
  tableHeader: { label: string; value: string }[] = [];
  totalRecords: number = 11;
  loading = false;
  data: any = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(data => {
      this.category = data.get('category');

      switch (this.category) {
        case 'people':
          Object.assign(this.tableHeader, peopleHeader)
          break;
        case 'films ':
          Object.assign(this.tableHeader, filmsHeader)
          break;
        case 'planets':
          Object.assign(this.tableHeader, planetHeader)
          break;
        case 'species':
          Object.assign(this.tableHeader, specieHeader)
          break;
        case 'starships':
          Object.assign(this.tableHeader, starshipHeader)
          break;
        case 'vehicles':
          Object.assign(this.tableHeader, vehicleHeader)
          break;
        default:
          Object.assign(this.tableHeader, peopleHeader)
          break;
      }
    })

    this.store.select(getAllCharacters).subscribe(data => {
      if (data) {
        this.totalRecords = data.count;
        this.data = data.results;
      }
    })
  }

  loadCustomers(event: LazyLoadEvent) {
    const page = event.first! / event?.rows! + 1
    this.store.dispatch(AppApiActions.fetchAllCharacters({ pageNumber: page }))
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
