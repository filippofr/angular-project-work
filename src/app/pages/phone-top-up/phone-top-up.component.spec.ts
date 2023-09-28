import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneTopUpComponent } from './phone-top-up.component';

describe('PhoneTopUpComponent', () => {
  let component: PhoneTopUpComponent;
  let fixture: ComponentFixture<PhoneTopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneTopUpComponent]
    });
    fixture = TestBed.createComponent(PhoneTopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
