import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDiscountReportRoutingModule } from './customer-discount-report-routing.module';
import { CustomerDiscountReportComponent } from './customer-discount-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';


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
    ButtonModule,
    TableModule,
    InputNumberModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxPrinterModule,
    NgxPrintModule
  ]
})
export class CustomerDiscountReportModule { }
