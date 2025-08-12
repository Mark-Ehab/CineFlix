import { TestBed } from '@angular/core/testing';

import { MoviesAPI } from './movies-api';

describe('MoviesAPI', () => {
  let service: MoviesAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
