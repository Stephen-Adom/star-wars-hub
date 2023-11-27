import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { SearchResultService } from 'src/shared/search-result-data.service';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let searchResultServiceSpy: jasmine.SpyObj<SearchResultService>;
  let storeSpy: jasmine.SpyObj<Store>;
  let mockRecentHistories: BehaviorSubject<{
    name: string,
    category: string,
    id: number,
    lastVisited: Date
  }[]>;

  beforeEach(() => {
    const searchResultServiceSpyObj = jasmine.createSpyObj('SearchResultService', ['sendResult', 'toggleDialogVisibility']);
    const storeSpyObj = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({}), NavigationComponent],
      declarations: [],
      providers: [
        { provide: SearchResultService, useValue: searchResultServiceSpyObj },
        { provide: Store, useValue: storeSpyObj },
      ],
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    searchResultServiceSpy = TestBed.inject(SearchResultService) as jasmine.SpyObj<SearchResultService>;
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    mockRecentHistories = new BehaviorSubject<{
      name: string,
      category: string,
      id: number,
      lastVisited: Date
    }[]>([]);
    storeSpy.select.and.returnValue(mockRecentHistories);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo image', () => {
    const { debugElement } = fixture;
    const logoElement = debugElement.query(By.css('.website-logo'));
    expect(logoElement).toBeTruthy();
  });

  it('should render lister page link with content Browse Characters', () => {
    const { debugElement } = fixture;
    const linkElement = debugElement.query(By.css('.lister-link'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.textContent).toContain('Browse Characters');
  })

  it('should render search input', () => {
    const { debugElement } = fixture;
    const searchElement = debugElement.query(By.css('input'));
    expect(searchElement).toBeTruthy();
  })

});
