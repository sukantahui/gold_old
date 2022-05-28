import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentSalaryComponent } from './agent-salary.component';

const routes: Routes = [{ path: '', component: AgentSalaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentSalaryRoutingModule { }
