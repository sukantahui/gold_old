import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentWiseCustomerReportComponent } from './agent-wise-customer-report.component';

const routes: Routes = [{ path: '', component: AgentWiseCustomerReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentWiseCustomerReportRoutingModule { }
