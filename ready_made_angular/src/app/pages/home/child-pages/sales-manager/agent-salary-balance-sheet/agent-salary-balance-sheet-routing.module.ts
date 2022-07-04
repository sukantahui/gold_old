import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentSalaryBalanceSheetComponent } from './agent-salary-balance-sheet.component';

const routes: Routes = [{ path: '', component: AgentSalaryBalanceSheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentSalaryBalanceSheetRoutingModule { }
