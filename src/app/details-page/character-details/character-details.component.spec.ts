import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CharacterDetailsComponent } from './character-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URI } from 'src/shared/api.service';
import { AppApiActions } from 'src/shared/store/app.actions';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
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
        CharacterDetailsComponent,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Store, useValue: storeSpyObj },
        { provide: ActivatedRoute, useValue: routeMockObj },
      ],
    });

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    routeMock = TestBed.inject(ActivatedRoute) as unknown as {
      paramMap: { subscribe: jasmine.Spy };
    };
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    storeSpy.select.and.returnValue(of(null));
    routeMock.paramMap.subscribe.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch character details when data is not available', fakeAsync(() => {
    const mockData: any = {};
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(null));

    spyOn(httpSpy, 'get').and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(httpSpy.get).toHaveBeenCalledWith(`${BASE_URI}people/1`);
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      AppApiActions.displayCharacterDetails({ character: mockData })
    );
  }));

  it('should save visit when character details are available', fakeAsync(() => {
    const mockCharacterDetails = {
      name: 'test',
      height: 'test',
      mass: 'test',
      hair_color: 'test',
      skin_color: 'test',
      eye_color: 'test',
      birth_year: 'test',
      gender: 'test',
      homeworld: 'test',
      films: ['test'],
      species: ['test'],
      vehicles: ['test'],
      starships: ['test'],
      created: 'test',
      edited: 'test',
      url: 'test',
    };
    routeMock.paramMap.subscribe.and.callFake((callback) => {
      callback({ get: () => '1' });
    });
    storeSpy.select.and.returnValue(of(mockCharacterDetails));

    fixture.detectChanges();
    tick();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  }));
});
