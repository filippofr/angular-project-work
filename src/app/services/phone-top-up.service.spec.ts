import { TestBed } from '@angular/core/testing';

import { PhoneTopUpService } from './phone-top-up.service';

describe('PhoneTopUpService', () => {
  let service: PhoneTopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneTopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
