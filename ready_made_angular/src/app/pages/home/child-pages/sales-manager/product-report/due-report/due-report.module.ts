import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DueReportRoutingModule } from './due-report-routing.module';
import { DueReportComponent } from './due-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    DueReportComponent
  ],
  imports: [
    CommonModule,
    DueReportRoutingModule,
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
export class DueReportModule { }
