import { TestBed } from '@angular/core/testing';

import { VideoSessionService } from './video-session.service';

describe('VideoSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoSessionService = TestBed.get(VideoSessionService);
    expect(service).toBeTruthy();
  });
});
