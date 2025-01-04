import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedaycounterComponent } from './gamedaycounter.component';

describe('GamedaycounterComponent', () => {
  let component: GamedaycounterComponent;
  let fixture: ComponentFixture<GamedaycounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamedaycounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamedaycounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
