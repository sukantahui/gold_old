import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusReportRoutingModule } from './status-report-routing.module';
import { StatusReportComponent } from './status-report.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatLegacyFormField as MatFormField, MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {FormControlName, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
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
