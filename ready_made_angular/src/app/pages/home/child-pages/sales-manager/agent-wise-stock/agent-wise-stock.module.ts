import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseStockRoutingModule } from './agent-wise-stock-routing.module';
import { AgentWiseStockComponent } from './agent-wise-stock.component';
import {MatCardModule} from '@angular/material/card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxPrinterModule} from "ngx-printer";
import {NgxPrintModule} from "ngx-print";
import {MatIconModule} from "@angular/material/icon";


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
