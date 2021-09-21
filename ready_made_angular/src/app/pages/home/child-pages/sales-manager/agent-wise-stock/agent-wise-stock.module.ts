import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseStockRoutingModule } from './agent-wise-stock-routing.module';
import { AgentWiseStockComponent } from './agent-wise-stock.component';
import {MatCardModule} from '@angular/material/card';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgentWiseStockModule { }
