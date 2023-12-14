import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLoanApplicationComponent } from './guest-loan-application.component';

describe('GuestLoanApplicationComponent', () => {
  let component: GuestLoanApplicationComponent;
  let fixture: ComponentFixture<GuestLoanApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestLoanApplicationComponent]
    });
    fixture = TestBed.createComponent(GuestLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
