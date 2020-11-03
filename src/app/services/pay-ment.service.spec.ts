import { TestBed } from '@angular/core/testing';

import { PayMentService } from './pay-ment.service';

describe('PayMentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayMentService = TestBed.get(PayMentService);
    expect(service).toBeTruthy();
  });
});
