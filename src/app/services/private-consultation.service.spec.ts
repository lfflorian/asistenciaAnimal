import { TestBed } from '@angular/core/testing';

import { PrivateConsultationService } from './private-consultation.service';

describe('PrivateConsultationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateConsultationService = TestBed.get(PrivateConsultationService);
    expect(service).toBeTruthy();
  });
});
