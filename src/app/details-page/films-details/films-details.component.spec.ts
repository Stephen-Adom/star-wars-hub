import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsDetailsComponent } from './films-details.component';

describe('FilmsDetailsComponent', () => {
  let component: FilmsDetailsComponent;
  let fixture: ComponentFixture<FilmsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FilmsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
