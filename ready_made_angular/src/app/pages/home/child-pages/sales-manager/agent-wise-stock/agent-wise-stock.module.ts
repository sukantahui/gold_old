import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentWiseStockRoutingModule } from './agent-wise-stock-routing.module';
import { AgentWiseStockComponent } from './agent-wise-stock.component';


@NgModule({
  declarations: [
    AgentWiseStockComponent
  ],
  imports: [
    CommonModule,
    AgentWiseStockRoutingModule
  ]
})
export class AgentWiseStockModule { }
