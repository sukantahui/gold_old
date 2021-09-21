import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseStockRoutingModule } from './agent-wise-stock-routing.module';
import { AgentWiseStockComponent } from './agent-wise-stock.component';
import {MatCardModule} from '@angular/material/card';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AgentWiseStockComponent
  ],
  imports: [
    CommonModule,
    AgentWiseStockRoutingModule,
    MatCardModule,
    NgSelectModule
  ]
})
export class AgentWiseStockModule { }
