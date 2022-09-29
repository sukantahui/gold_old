import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockInHandReportRoutingModule } from './stock-in-hand-report-routing.module';
import { StockInHandReportComponent } from './stock-in-hand-report.component';


@NgModule({
  declarations: [
    StockInHandReportComponent
  ],
  imports: [
    CommonModule,
    StockInHandReportRoutingModule
  ]
})
export class StockInHandReportModule { }
