import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobReportRoutingModule } from './job-report-routing.module';
import { JobReportComponent } from './job-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    JobReportComponent
  ],
  imports: [
    CommonModule,
    JobReportRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputNumberModule
  ]
})
export class JobReportModule { }
