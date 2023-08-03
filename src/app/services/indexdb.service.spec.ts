import { TestBed } from '@angular/core/testing';

import { IndexdbService } from './indexdb.service';

describe('IndexdbService', () => {
  let service: IndexdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
