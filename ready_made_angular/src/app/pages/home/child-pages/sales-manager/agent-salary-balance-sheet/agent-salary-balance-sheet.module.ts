import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentSalaryBalanceSheetRoutingModule } from './agent-salary-balance-sheet-routing.module';
import { AgentSalaryBalanceSheetComponent } from './agent-salary-balance-sheet.component';


@NgModule({
  declarations: [
    AgentSalaryBalanceSheetComponent
  ],
  imports: [
    CommonModule,
    AgentSalaryBalanceSheetRoutingModule
  ]
})
export class AgentSalaryBalanceSheetModule { }
