import { TestBed } from '@angular/core/testing';

import { FloodCoreService } from './flood-core.service';

describe('FloodCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);
    expect(service).toBeTruthy();
  });
});
