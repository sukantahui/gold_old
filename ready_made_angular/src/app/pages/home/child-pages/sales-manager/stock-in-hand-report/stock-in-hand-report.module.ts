import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockInHandReportRoutingModule } from './stock-in-hand-report-routing.module';
import { StockInHandReportComponent } from './stock-in-hand-report.component';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    StockInHandReportComponent
  ],
  imports: [
    CommonModule,
    StockInHandReportRoutingModule,
    TableModule
  ]
})
export class StockInHandReportModule { }
