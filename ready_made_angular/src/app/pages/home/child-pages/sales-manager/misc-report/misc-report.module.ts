import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscReportRoutingModule } from './misc-report-routing.module';
import { MiscReportComponent } from './misc-report.component';


@NgModule({
  declarations: [
    MiscReportComponent
  ],
  imports: [
    CommonModule,
    MiscReportRoutingModule
  ]
})
export class MiscReportModule { }
