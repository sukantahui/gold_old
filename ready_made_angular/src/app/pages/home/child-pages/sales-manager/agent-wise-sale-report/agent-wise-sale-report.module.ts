import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseSaleReportRoutingModule } from './agent-wise-sale-report-routing.module';
import { AgentWiseSaleReportComponent } from './agent-wise-sale-report.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {FlexModule} from '@angular/flex-layout';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSortModule} from "@angular/material/sort";
import {MatLegacySlideToggle as MatSlideToggle, MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {LayoutModule} from '@angular/cdk/layout';



@NgModule({
  declarations: [
    AgentWiseSaleReportComponent
  ],
  imports: [
    CommonModule,
    AgentWiseSaleReportRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    NgSelectModule,
    MatIconModule,
    MatSortModule,
    MatSlideToggleModule,
    NgxPrinterModule,
    NgxPrintModule,
    LayoutModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AgentWiseSaleReportModule { }
