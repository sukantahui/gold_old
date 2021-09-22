import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseCustomerReportRoutingModule } from './agent-wise-customer-report-routing.module';
import { AgentWiseCustomerReportComponent } from './agent-wise-customer-report.component';
import {MatCardModule} from '@angular/material/card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    AgentWiseCustomerReportComponent
  ],
  imports: [
    CommonModule,
    AgentWiseCustomerReportRoutingModule,
    MatCardModule,
    NgSelectModule,
    FlexModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxPrinterModule,
    NgxPrintModule
  ]
})
export class AgentWiseCustomerReportModule { }
