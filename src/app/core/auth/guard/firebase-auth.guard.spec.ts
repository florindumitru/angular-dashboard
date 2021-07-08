import { TestBed } from '@angular/core/testing';

import { FirebaseAuthGuard } from './firebase-auth.guard';

describe('FirebaseAuthGuard', () => {
  let guard: FirebaseAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirebaseAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
