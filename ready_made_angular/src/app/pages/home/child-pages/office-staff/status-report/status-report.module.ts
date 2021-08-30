import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusReportRoutingModule } from './status-report-routing.module';
import { StatusReportComponent } from './status-report.component';


@NgModule({
  declarations: [
    StatusReportComponent
  ],
  imports: [
    CommonModule,
    StatusReportRoutingModule
  ]
})
export class StatusReportModule { }
