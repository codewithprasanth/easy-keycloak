import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleRendererComponent } from './toggle-renderer.component';

describe('ToggleRendererComponent', () => {
  let component: ToggleRendererComponent;
  let fixture: ComponentFixture<ToggleRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
