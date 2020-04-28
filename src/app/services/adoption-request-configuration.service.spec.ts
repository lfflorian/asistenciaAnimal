import { TestBed } from '@angular/core/testing';

import { AdoptionRequestConfigurationService } from './adoption-request-configuration.service';

describe('AdoptionRequestConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdoptionRequestConfigurationService = TestBed.get(AdoptionRequestConfigurationService);
    expect(service).toBeTruthy();
  });
});
