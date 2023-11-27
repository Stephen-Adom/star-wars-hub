import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipDetailsComponent } from './starship-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppApiActions } from 'src/shared/store/app.actions';
import { BASE_URI } from 'src/shared/api.service';

describe('StarshipDetailsComponent', () => {
  let component: StarshipDetailsComponent;
  let fixture: ComponentFixture<StarshipDetailsComponent>;
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
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), StarshipDetailsComponent],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(StarshipDetailsComponent);
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

  it('should fetch starship details when data is not available', () => {
    const mockData: any = {};
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();

    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}starships/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(AppApiActions.displayStarshipDetails({ starship: mockData }));
  });

  it('should save visit when starship details are available', () => {
    const mockStarshipDetails = {
      name: 'test',
      model: 'test',
      manufacturer: 'test',
      cost_in_credits: 1000,
      length: 1000,
      max_atmosphering_speed: 'test',
      crew: 'test',
      passengers: 10000,
      cargo_capacity: 10000,
      consumables: 'test',
      vehicle_class: 'test',
    };
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockStarshipDetails));

    fixture.detectChanges();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
