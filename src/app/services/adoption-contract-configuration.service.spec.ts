import { TestBed } from '@angular/core/testing';

import { AdoptionContractConfigurationService } from './adoption-contract-configuration.service';

describe('AdoptionContractConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdoptionContractConfigurationService = TestBed.get(AdoptionContractConfigurationService);
    expect(service).toBeTruthy();
  });
});
