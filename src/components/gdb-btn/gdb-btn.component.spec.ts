import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdbBtnComponent } from './gdb-btn.component';

describe('GdbBtnComponent', () => {
  let component: GdbBtnComponent;
  let fixture: ComponentFixture<GdbBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdbBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdbBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
