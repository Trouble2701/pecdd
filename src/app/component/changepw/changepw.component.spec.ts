import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwComponent } from './changepw.component';

describe('ChangepwComponent', () => {
  let component: ChangepwComponent;
  let fixture: ComponentFixture<ChangepwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangepwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
