import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentSalaryWithdrawComponent } from './agent-salary-withdraw.component';

const routes: Routes = [{ path: '', component: AgentSalaryWithdrawComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentSalaryWithdrawRoutingModule { }
