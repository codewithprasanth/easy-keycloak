import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdbCheckboxComponent } from './gdb-checkbox.component';

describe('GdbCheckboxComponent', () => {
  let component: GdbCheckboxComponent;
  let fixture: ComponentFixture<GdbCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GdbCheckboxComponent]
    });
    fixture = TestBed.createComponent(GdbCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
