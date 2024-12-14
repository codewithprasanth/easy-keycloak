import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTooltipComponent } from './ag-tooltip.component';

describe('AgTooltipComponent', () => {
  let component: AgTooltipComponent;
  let fixture: ComponentFixture<AgTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
