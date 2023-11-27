import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerPageComponent } from './lister-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListerPageComponent', () => {
  let component: ListerPageComponent;
  let fixture: ComponentFixture<ListerPageComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routeMock: { paramMap: { subscribe: jasmine.Spy } };
  let locationMock: jasmine.SpyObj<Location>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routeMockObj = {
      paramMap: { subscribe: jasmine.createSpy() },
    };
    const locationMockObj = jasmine.createSpyObj('Location', ['back']);
    const routerMockObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        ListerPageComponent,
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
      declarations: [],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
        { provide: Location, useValue: locationMockObj },
        { provide: Router, useValue: routerMockObj },
        ChangeDetectorRef,
      ],
    });

    fixture = TestBed.createComponent(ListerPageComponent);
    component = fixture.componentInstance;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    routeMock = TestBed.inject(ActivatedRoute) as unknown as {
      paramMap: { subscribe: jasmine.Spy };
    };
    locationMock = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    storeSpy.select.and.returnValue(of(null));
    routeMock.paramMap.subscribe.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date', () => {
    const formattedDate = component.formatDate('2023-11-26T12:00:00Z');
    expect(formattedDate).toEqual('November 26th, 2023');
  });

  it('should view details', () => {
    const info = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/2/'],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      starships: ['https://swapi.dev/api/starships/12/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
    component.category = 'people';

    component.viewDetails(info);
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
