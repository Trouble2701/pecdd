import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwforgotComponent } from './pwforgot.component';

describe('PwforgotComponent', () => {
  let component: PwforgotComponent;
  let fixture: ComponentFixture<PwforgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwforgotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PwforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
