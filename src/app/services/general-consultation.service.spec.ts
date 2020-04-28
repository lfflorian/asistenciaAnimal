import { TestBed } from '@angular/core/testing';

import { GeneralConsultationService } from './general-consultation.service';

describe('GeneralConsultationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralConsultationService = TestBed.get(GeneralConsultationService);
    expect(service).toBeTruthy();
  });
});
