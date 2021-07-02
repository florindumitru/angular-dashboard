import { TestBed } from '@angular/core/testing';

import { HttpFirestoreService } from './http-firestore.service';

describe('HttpFirestoreService', () => {
  let service: HttpFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
