import { TestBed } from '@angular/core/testing';

import { ProductsAPI } from './products-api';

describe('ProductsAPI', () => {
  let service: ProductsAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
