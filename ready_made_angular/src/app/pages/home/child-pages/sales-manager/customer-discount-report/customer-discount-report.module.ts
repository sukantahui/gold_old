import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDiscountReportRoutingModule } from './customer-discount-report-routing.module';
import { CustomerDiscountReportComponent } from './customer-discount-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CustomerDiscountReportComponent
  ],
  imports: [
    CommonModule,
    CustomerDiscountReportRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class CustomerDiscountReportModule { }
