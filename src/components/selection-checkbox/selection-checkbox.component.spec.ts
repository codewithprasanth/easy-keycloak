import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCheckboxComponent } from './selection-checkbox.component';

describe('SelectionCheckboxComponent', () => {
  let component: SelectionCheckboxComponent;
  let fixture: ComponentFixture<SelectionCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionCheckboxComponent]
    });
    fixture = TestBed.createComponent(SelectionCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
