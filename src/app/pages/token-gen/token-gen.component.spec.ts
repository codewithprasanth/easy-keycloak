import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGenComponent } from './token-gen.component';

describe('TokenGenComponent', () => {
  let component: TokenGenComponent;
  let fixture: ComponentFixture<TokenGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenGenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TokenGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
