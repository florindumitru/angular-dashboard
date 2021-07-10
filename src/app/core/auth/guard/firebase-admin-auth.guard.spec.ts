import { TestBed } from '@angular/core/testing';

import { FirebaseAdminAuthGuard } from './firebase-admin-auth.guard';

describe('FirebaseAdminAuthGuard', () => {
  let guard: FirebaseAdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirebaseAdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
