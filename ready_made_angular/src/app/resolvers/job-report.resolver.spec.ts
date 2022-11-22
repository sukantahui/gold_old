import { TestBed } from '@angular/core/testing';

import { JobReportResolver } from './job-report.resolver';

describe('JobReportResolver', () => {
  let resolver: JobReportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobReportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
