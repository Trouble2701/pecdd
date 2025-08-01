import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartanimationComponent } from './startanimation.component';

describe('StartanimationComponent', () => {
  let component: StartanimationComponent;
  let fixture: ComponentFixture<StartanimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartanimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
