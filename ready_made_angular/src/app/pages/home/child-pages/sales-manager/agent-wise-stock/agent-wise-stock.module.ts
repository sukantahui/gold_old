import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseStockRoutingModule } from './agent-wise-stock-routing.module';
import { AgentWiseStockComponent } from './agent-wise-stock.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxPrinterModule} from "ngx-printer";
import {NgxPrintModule} from "ngx-print";
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AgentWiseStockComponent
  ],
  imports: [
    CommonModule,
    AgentWiseStockRoutingModule,
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
export class AgentWiseStockModule { }
