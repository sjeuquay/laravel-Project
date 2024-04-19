import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourquocteComponent } from './tourquocte.component';

describe('TourquocteComponent', () => {
  let component: TourquocteComponent;
  let fixture: ComponentFixture<TourquocteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourquocteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourquocteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
