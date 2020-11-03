import { TestBed } from '@angular/core/testing';

import { AnimalTypeService } from './animal-type.service';

describe('AnimalTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimalTypeService = TestBed.get(AnimalTypeService);
    expect(service).toBeTruthy();
  });
});
