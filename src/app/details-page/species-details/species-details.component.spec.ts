import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDetailsComponent } from './species-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppApiActions } from 'src/shared/store/app.actions';
import { BASE_URI } from 'src/shared/api.service';

describe('SpeciesDetailsComponent', () => {
  let component: SpeciesDetailsComponent;
  let fixture: ComponentFixture<SpeciesDetailsComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let routeMock: { paramMap: { subscribe: jasmine.Spy } };

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routeMockObj = {
      paramMap: { subscribe: jasmine.createSpy() },
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        SpeciesDetailsComponent,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(SpeciesDetailsComponent);
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

  it('should fetch species details when data is not available', () => {
    const mockData: any = {};
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();
    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}species/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      AppApiActions.displaySpeciesDetails({ species: mockData })
    );
  });

  it('should save visit and fetch homeworld details when species details are available', () => {
    const mockSpeciesDetails = {
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      average_lifespan: '120',
      homeworld: 'https://swapi.dev/api/planets/9/',
      language: 'Galactic Basic',
      people: ['https://swapi.dev/api/people/66/'],
      films: ['https://swapi.dev/api/films/1/'],
      created: '2014-12-10T13:52:11.567000Z',
      edited: '2014-12-20T21:36:42.136000Z',
      url: 'https://swapi.dev/api/species/1/',
    };
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockSpeciesDetails));
    spyOn(httpSpy, 'get').and.returnValue(
      of({
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: ['https://swapi.dev/api/people/1/'],
        films: ['https://swapi.dev/api/films/1/'],
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/',
      })
    );

    fixture.detectChanges();

    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(httpSpy.get).toHaveBeenCalledWith(mockSpeciesDetails.homeworld);
  });
});
