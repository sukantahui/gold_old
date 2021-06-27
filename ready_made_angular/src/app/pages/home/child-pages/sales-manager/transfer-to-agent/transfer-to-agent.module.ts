import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferToAgentRoutingModule } from './transfer-to-agent-routing.module';
import { TransferToAgentComponent } from './transfer-to-agent.component';


@NgModule({
  declarations: [
    TransferToAgentComponent
  ],
  imports: [
    CommonModule,
    TransferToAgentRoutingModule
  ]
})
export class TransferToAgentModule { }
