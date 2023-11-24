import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerPageComponent } from './lister-page.component';

describe('ListerPageComponent', () => {
  let component: ListerPageComponent;
  let fixture: ComponentFixture<ListerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
