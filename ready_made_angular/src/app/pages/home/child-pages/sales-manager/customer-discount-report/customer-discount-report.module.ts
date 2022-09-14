import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDiscountReportRoutingModule } from './customer-discount-report-routing.module';
import { CustomerDiscountReportComponent } from './customer-discount-report.component';


@NgModule({
  declarations: [
    CustomerDiscountReportComponent
  ],
  imports: [
    CommonModule,
    CustomerDiscountReportRoutingModule
  ]
})
export class CustomerDiscountReportModule { }
