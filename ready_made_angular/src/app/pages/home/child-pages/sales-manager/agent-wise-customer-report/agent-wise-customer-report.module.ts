import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseCustomerReportRoutingModule } from './agent-wise-customer-report-routing.module';
import { AgentWiseCustomerReportComponent } from './agent-wise-customer-report.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
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
