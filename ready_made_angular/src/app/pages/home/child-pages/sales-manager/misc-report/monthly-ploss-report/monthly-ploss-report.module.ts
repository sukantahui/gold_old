import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyPlossReportRoutingModule } from './monthly-ploss-report-routing.module';
import { MonthlyPlossReportComponent } from './monthly-ploss-report.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    MonthlyPlossReportComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MonthlyPlossReportRoutingModule,
    NgxPrintModule
  ]
})
export class MonthlyPlossReportModule { }
