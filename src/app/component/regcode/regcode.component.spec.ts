import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcodeComponent } from './regcode.component';

describe('RegcodeComponent', () => {
  let component: RegcodeComponent;
  let fixture: ComponentFixture<RegcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
