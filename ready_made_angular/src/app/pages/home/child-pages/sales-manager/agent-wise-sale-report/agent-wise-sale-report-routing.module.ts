import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentWiseSaleReportComponent } from './agent-wise-sale-report.component';

const routes: Routes = [{ path: '', component: AgentWiseSaleReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentWiseSaleReportRoutingModule { }
