import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FineReturnedToOwnerReportRoutingModule } from './fine-returned-to-owner-report-routing.module';
import { FineReturnedToOwnerReportComponent } from './fine-returned-to-owner-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    FineReturnedToOwnerReportComponent
  ],
  imports: [
    CommonModule,
    FineReturnedToOwnerReportRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputNumberModule
  ]
})
export class FineReturnedToOwnerReportModule { }
