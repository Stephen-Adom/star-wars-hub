import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleType } from 'src/shared/data.types';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';
import { AppState, getVehicleDetail } from 'src/shared/store/app.reducer';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent {
  dataId!: string;
  vehicleDetailsSubscription = new Subscription();
  vehicleDetails!: VehicleType;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.dataId = data.get('id')!;
    })


    this.vehicleDetailsSubscription = this.store.select(getVehicleDetail).subscribe((data) => {
      if (data) {
        this.vehicleDetails = data;
      } else {
        this.fetchVehicleDetails();
      }
    })
  }

  fetchVehicleDetails() {
    this.http.get(BASE_URI + 'vehicles/' + this.dataId).subscribe((data: any) => {
      if (data) {
        this.store.dispatch(AppApiActions.displayVehicleDetails({ vehicle: data }))
      }
    })
  }
}
