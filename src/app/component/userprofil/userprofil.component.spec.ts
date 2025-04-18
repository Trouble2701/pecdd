import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofilComponent } from './userprofil.component';

describe('UserprofilComponent', () => {
  let component: UserprofilComponent;
  let fixture: ComponentFixture<UserprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserprofilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
