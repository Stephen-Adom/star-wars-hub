import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPageComponent } from './details-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from 'src/shared/store/app.reducer';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailsPageComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ app: AppReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render category name in DOM', () => {
    component.category = 'people';
    fixture.detectChanges();
    const categoryElement = fixture.debugElement.query(
      By.css('.category-title')
    );
    expect(categoryElement).toBeTruthy();
    expect(categoryElement.nativeElement.textContent).toContain(
      'People Details'
    );
  });

  it('should render character component', () => {
    component.category = 'people';
    fixture.detectChanges();
    const characterElement = fixture.debugElement.query(
      By.css('app-character-details')
    );
    expect(characterElement).toBeTruthy();
  });

  it('should render films component', () => {
    component.category = 'films';
    fixture.detectChanges();
    const filmsElement = fixture.debugElement.query(
      By.css('app-films-details')
    );
    expect(filmsElement).toBeTruthy();
  });

  it('should render planet component', () => {
    component.category = 'planets';
    fixture.detectChanges();
    const planetElement = fixture.debugElement.query(
      By.css('app-planet-details')
    );
    expect(planetElement).toBeTruthy();
  });

  it('should render species component', () => {
    component.category = 'species';
    fixture.detectChanges();
    const speciesElement = fixture.debugElement.query(
      By.css('app-species-details')
    );
    expect(speciesElement).toBeTruthy();
  });

  it('should render starships component', () => {
    component.category = 'starships';
    fixture.detectChanges();
    const starshipElement = fixture.debugElement.query(
      By.css('app-starship-details')
    );
    expect(starshipElement).toBeTruthy();
  });

  it('should render vehicle component', () => {
    component.category = 'vehicles';
    fixture.detectChanges();
    const vehicleElement = fixture.debugElement.query(
      By.css('app-vehicle-details')
    );
    expect(vehicleElement).toBeTruthy();
  });
});
