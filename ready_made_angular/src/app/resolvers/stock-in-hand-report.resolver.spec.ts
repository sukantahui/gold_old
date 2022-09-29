import { TestBed } from '@angular/core/testing';

import { StockInHandReportResolver } from './stock-in-hand-report.resolver';

describe('StockInHandReportResolver', () => {
  let resolver: StockInHandReportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StockInHandReportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
