import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize swiper container', () => {
    spyOn(component.swiperContainer.nativeElement, 'initialize');
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(
      component.swiperContainer.nativeElement.initialize
    ).toHaveBeenCalled();
  });

  it('should display info cards in the template', () => {
    fixture.detectChanges();
    const infoCards = fixture.debugElement.queryAll(By.css('swiper-slide'));
    expect(infoCards.length).toEqual(component.infoOverview.length);
  });
});
