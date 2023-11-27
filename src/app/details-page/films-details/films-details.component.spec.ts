import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FilmsDetailsComponent } from './films-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppApiActions } from 'src/shared/store/app.actions';
import { BASE_URI } from 'src/shared/api.service';

describe('FilmsDetailsComponent', () => {
  let component: FilmsDetailsComponent;
  let fixture: ComponentFixture<FilmsDetailsComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routeMock: { paramMap: { subscribe: jasmine.Spy } };
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routeMockObj = {
      paramMap: { subscribe: jasmine.createSpy() }
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, FilmsDetailsComponent, StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(FilmsDetailsComponent);
    component = fixture.componentInstance;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    routeMock = TestBed.inject(ActivatedRoute) as unknown as { paramMap: { subscribe: jasmine.Spy } };
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    storeSpy.select.and.returnValue(of(null));
    routeMock.paramMap.subscribe.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch film details when data is not available', fakeAsync(() => {
    const mockData: any = {};
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}films/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(AppApiActions.displayFilmDetails({ film: mockData }));
  }));

  it('should save visit when film details are available', fakeAsync(() => {
    const mockFilmDetails = {
      title: "A New Hope",
      episode_id: 4,
      opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: "George Lucas",
      producer: "Gary Kurtz, Rick McCallum",
      release_date: "1977-05-25",
      characters: [
        "https://swapi.dev/api/people/1/",
      ],
      planets: [
        "https://swapi.dev/api/planets/1/",
      ],
      starships: [
        "https://swapi.dev/api/starships/2/",
      ],
      vehicles: [
        "https://swapi.dev/api/vehicles/4/",
      ],
      species: [
        "https://swapi.dev/api/species/1/",
      ],
      created: "2014-12-10T14:23:31.880000Z",
      edited: "2014-12-20T19:49:45.256000Z",
      url: "https://swapi.dev/api/films/1/"
    };
    routeMock.paramMap.subscribe.and.callFake(callback => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockFilmDetails));

    fixture.detectChanges();
    tick();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  }));
});
