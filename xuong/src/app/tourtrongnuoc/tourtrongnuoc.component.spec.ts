import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourtrongnuocComponent } from './tourtrongnuoc.component';

describe('TourtrongnuocComponent', () => {
  let component: TourtrongnuocComponent;
  let fixture: ComponentFixture<TourtrongnuocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourtrongnuocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourtrongnuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
