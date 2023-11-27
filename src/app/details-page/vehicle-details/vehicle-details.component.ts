import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  dataId!: string;
  category!: string;
  vehicleDetailsSubscription: Subscription | null = new Subscription();
  httpSubscription: Subscription | null = new Subscription();
  routeSubscription: Subscription | null = new Subscription();
  vehicleDetails!: VehicleType;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((data) => {
      this.dataId = data.get('id')!;
      this.category = data.get('category')!;
    });

    this.vehicleDetailsSubscription = this.store
      .select(getVehicleDetail)
      .subscribe((data) => {
        if (data) {
          this.vehicleDetails = data;
          this.saveVisit();
        } else {
          this.fetchVehicleDetails();
        }
      });
  }

  fetchVehicleDetails() {
    this.httpSubscription = this.http
      .get(BASE_URI + 'vehicles/' + this.dataId)
      .subscribe((data: any) => {
        if (data) {
          this.store.dispatch(
            AppApiActions.displayVehicleDetails({ vehicle: data })
          );
        }
      });
  }

  saveVisit() {
    this.store.dispatch(
      AppApiActions.updateVisitHistory({
        history: {
          name: this.vehicleDetails.name,
          category: this.category as string,
          id: parseInt(this.dataId!),
          lastVisited: new Date(),
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.vehicleDetailsSubscription?.unsubscribe();
    this.httpSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
