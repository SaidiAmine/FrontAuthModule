import { TestBed, async, inject } from '@angular/core/testing';

import { DetailsGuardGuard } from './details-guard.guard';

describe('DetailsGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsGuardGuard]
    });
  });

  it('should ...', inject([DetailsGuardGuard], (guard: DetailsGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
