import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockInHandReportRoutingModule } from './stock-in-hand-report-routing.module';
import { StockInHandReportComponent } from './stock-in-hand-report.component';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';


@NgModule({
  declarations: [
    StockInHandReportComponent
  ],
  imports: [
    CommonModule,
    StockInHandReportRoutingModule,
    TableModule,
    NgSelectModule,
    FlexModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class StockInHandReportModule { }
