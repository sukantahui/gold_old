import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailsReportRoutingModule } from './job-details-report-routing.module';
import { JobDetailsReportComponent } from './job-details-report.component';


@NgModule({
  declarations: [
    JobDetailsReportComponent
  ],
  imports: [
    CommonModule,
    JobDetailsReportRoutingModule
  ]
})
export class JobDetailsReportModule { }
