import { TestBed, async, inject } from '@angular/core/testing';

import { AuthoticityGuard } from './authoticity.guard';

describe('AuthoticityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthoticityGuard]
    });
  });

  it('should ...', inject([AuthoticityGuard], (guard: AuthoticityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
