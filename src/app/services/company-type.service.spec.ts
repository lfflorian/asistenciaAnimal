import { TestBed } from '@angular/core/testing';

import { CompanyTypeService } from './company-type.service';

describe('CompanyTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyTypeService = TestBed.get(CompanyTypeService);
    expect(service).toBeTruthy();
  });
});
