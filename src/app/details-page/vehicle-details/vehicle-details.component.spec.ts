import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsComponent } from './vehicle-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppApiActions } from 'src/shared/store/app.actions';
import { BASE_URI } from 'src/shared/api.service';
import { HttpClient } from '@angular/common/http';

describe('VehicleDetailsComponent', () => {
  let component: VehicleDetailsComponent;
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let routeMock: { paramMap: { subscribe: jasmine.Spy } };

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routeMockObj = {
      paramMap: { subscribe: jasmine.createSpy() }
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), VehicleDetailsComponent],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(VehicleDetailsComponent);
    component = fixture.componentInstance;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    routeMock = TestBed.inject(ActivatedRoute) as unknown as { paramMap: { subscribe: jasmine.Spy } };

    storeSpy.select.and.returnValue(of(null));
    routeMock.paramMap.subscribe.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicle details when data is not available', () => {
    const mockData: any = {
      name: 'test',
      model: 'test',
      manufacturer: 'test',
      cost_in_credits: 'test',
      length: 'test',
      max_atmosphering_speed: 'test',
      crew: 'test',
      passengers: 'test',
      cargo_capacity: 'test',
      consumables: 'test',
      vehicle_class: 'test',
      pilots: ['test'],
      films: ['test'],
      created: 'test',
      edited: 'test',
      url: 'test',
    };
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();
    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}vehicles/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(AppApiActions.displayVehicleDetails({ vehicle: mockData }));
  });

  it('should save visit when vehicle details are available', () => {
    const mockVehicleDetails = {
      name: 'test',
      model: 'test',
      manufacturer: 'test',
      cost_in_credits: 'test',
      length: 'test',
      max_atmosphering_speed: 'test',
      crew: 'test',
      passengers: 'test',
      cargo_capacity: 'test',
      consumables: 'test',
      vehicle_class: 'test',
      pilots: ['test'],
      films: ['test'],
      created: 'test',
      edited: 'test',
      url: 'test',
    };
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockVehicleDetails));

    fixture.detectChanges();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
