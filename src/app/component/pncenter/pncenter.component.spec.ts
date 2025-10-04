import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PncenterComponent } from './pncenter.component';

describe('PncenterComponent', () => {
  let component: PncenterComponent;
  let fixture: ComponentFixture<PncenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PncenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
