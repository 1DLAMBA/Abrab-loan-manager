import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLoginComponent } from './guest-login.component';

describe('GuestLoginComponent', () => {
  let component: GuestLoginComponent;
  let fixture: ComponentFixture<GuestLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestLoginComponent]
    });
    fixture = TestBed.createComponent(GuestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
