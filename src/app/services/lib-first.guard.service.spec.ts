import { TestBed } from '@angular/core/testing';

import { LibFirst.GuardService } from './lib-first.guard.service';

describe('LibFirst.GuardService', () => {
  let service: LibFirst.GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibFirst.GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
