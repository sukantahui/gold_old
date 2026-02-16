import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyManagerialReportRoutingModule } from './monthly-managerial-report-routing.module';
import { MonthlyManagerialReportComponent } from './monthly-managerial-report.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MonthlyManagerialReportComponent
  ],
  imports: [
    CommonModule,
    MonthlyManagerialReportRoutingModule,
    FormsModule
  ]
})
export class MonthlyManagerialReportModule { }
