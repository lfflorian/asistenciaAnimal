import { TestBed } from '@angular/core/testing';

import { AdoptionFormService } from './adoption-form.service';

describe('AdoptionForm', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdoptionFormService = TestBed.get(AdoptionFormService);
    expect(service).toBeTruthy();
  });
});
