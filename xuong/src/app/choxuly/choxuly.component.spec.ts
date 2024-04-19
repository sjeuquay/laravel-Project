import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoxulyComponent } from './choxuly.component';

describe('ChoxulyComponent', () => {
  let component: ChoxulyComponent;
  let fixture: ComponentFixture<ChoxulyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoxulyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoxulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
