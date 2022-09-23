import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReportRoutingModule } from './product-report-routing.module';
import { ProductReportComponent } from './product-report.component';


@NgModule({
  declarations: [
    ProductReportComponent
  ],
  imports: [
    CommonModule,
    ProductReportRoutingModule
  ]
})
export class ProductReportModule { }
