import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseSaleReportRoutingModule } from './agent-wise-sale-report-routing.module';
import { AgentWiseSaleReportComponent } from './agent-wise-sale-report.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSortModule} from "@angular/material/sort";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
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
