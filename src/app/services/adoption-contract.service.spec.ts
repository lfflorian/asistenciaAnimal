import { TestBed } from '@angular/core/testing';

import { AdoptionContractService } from './adoption-contract.service';

describe('AdoptionContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdoptionContractService = TestBed.get(AdoptionContractService);
    expect(service).toBeTruthy();
  });
});
