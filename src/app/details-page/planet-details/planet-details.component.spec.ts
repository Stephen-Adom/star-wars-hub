import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDetailsComponent } from './planet-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';

describe('PlanetDetailsComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routeMock: { paramMap: { subscribe: jasmine.Spy } };
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routeMockObj = {
      paramMap: { subscribe: jasmine.createSpy() },
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        PlanetDetailsComponent,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    routeMock = TestBed.inject(ActivatedRoute) as unknown as {
      paramMap: { subscribe: jasmine.Spy };
    };

    storeSpy.select.and.returnValue(of(null));
    routeMock.paramMap.subscribe.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planet details when data is not available', () => {
    const mockData: any = {};
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();
    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}planets/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      AppApiActions.displayPlanetDetails({ planet: mockData })
    );
  });

  it('should save visit when planet details are available', () => {
    const mockPlanetDetails = {
      name: 'test',
      rotation_period: 'test',
      orbital_period: 1000,
      diameter: 1000,
      climate: 'test',
      gravity: 'test',
      terrain: 'test',
      surface_water: 'test',
      population: 1000,
      residents: 'test',
      films: 'test',
      created: 'test',
      edited: 'test',
      url: 'test',
    };
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockPlanetDetails));

    fixture.detectChanges();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
