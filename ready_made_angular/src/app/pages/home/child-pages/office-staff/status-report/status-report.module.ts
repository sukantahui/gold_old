import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusReportRoutingModule } from './status-report-routing.module';
import { StatusReportComponent } from './status-report.component';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormControlName, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    StatusReportComponent
  ],
    imports: [
        CommonModule,
        StatusReportRoutingModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FlexModule
    ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class StatusReportModule { }
