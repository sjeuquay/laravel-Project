import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuutrudonhangComponent } from './luutrudonhang.component';

describe('LuutrudonhangComponent', () => {
  let component: LuutrudonhangComponent;
  let fixture: ComponentFixture<LuutrudonhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuutrudonhangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LuutrudonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
