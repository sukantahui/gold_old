import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DueReportRoutingModule } from './due-report-routing.module';
import { DueReportComponent } from './due-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';


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
  ]
})
export class DueReportModule { }
