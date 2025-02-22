import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizeComponent } from './page-size.component';

describe('PageSizeComponent', () => {
  let component: PageSizeComponent;
  let fixture: ComponentFixture<PageSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSizeComponent]
    });
    fixture = TestBed.createComponent(PageSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
