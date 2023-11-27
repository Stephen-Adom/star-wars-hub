import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultDialogComponent } from './search-result-dialog.component';
import { SearchResultService } from 'src/shared/search-result-data.service';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { searchResponseType } from 'src/shared/data.types';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchResultDialogComponent', () => {
  let component: SearchResultDialogComponent;
  let fixture: ComponentFixture<SearchResultDialogComponent>;
  let searchResultServiceSpy: jasmine.SpyObj<SearchResultService>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const searchResultServiceSpyObj = jasmine.createSpyObj('SearchResultService', ['toggleDialogVisibility', 'resultDataObservable']);
    const storeSpyObj = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SearchResultDialogComponent, StoreModule.forRoot({}), BrowserAnimationsModule],
      declarations: [],
      providers: [
        { provide: SearchResultService, useValue: searchResultServiceSpyObj },
        { provide: Store, useValue: storeSpyObj },
      ],
    });

    fixture = TestBed.createComponent(SearchResultDialogComponent);
    component = fixture.componentInstance;
    searchResultServiceSpy = TestBed.inject(SearchResultService) as jasmine.SpyObj<SearchResultService>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    searchResultServiceSpy.resultDataObservable = of(null);
    searchResultServiceSpy.toggleDialogVisibilityObservable = of(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the dialog when onHide is called', () => {
    component.onHide();

    expect(searchResultServiceSpy.toggleDialogVisibility).toHaveBeenCalledWith(false);
  });

  it('should update the visibility on toggleDialogVisibilityObservable change', () => {
    searchResultServiceSpy.toggleDialogVisibilityObservable = of(false);

    fixture.detectChanges();

    expect(component.visible).toBe(false);
  });

  it('should update the result on resultDataObservable change', () => {
    const mockResult: searchResponseType = {
      count: 1,
      next: null,
      previous: null,
      results: [{
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/2/",
        ],
        species: [
          "https://swapi.dev/api/species/1/"
        ],
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/"
        ],
        starships: [
          "https://swapi.dev/api/starships/12/",
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/"
      }],
    };

    searchResultServiceSpy.resultDataObservable = of(mockResult);

    fixture.detectChanges();

    expect(component.result).toEqual(mockResult);
  });
});
