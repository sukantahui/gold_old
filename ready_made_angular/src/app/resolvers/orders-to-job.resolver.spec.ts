import { TestBed } from '@angular/core/testing';

import { OrdersToJobResolver } from './orders-to-job.resolver';

describe('OrdersToJobResolver', () => {
  let resolver: OrdersToJobResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrdersToJobResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
