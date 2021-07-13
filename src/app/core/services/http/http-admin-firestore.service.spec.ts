import { TestBed } from '@angular/core/testing';

import { HttpAdminFirestoreService } from './http-admin-firestore.service';

describe('HttpAdminFirestoreService', () => {
  let service: HttpAdminFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAdminFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
