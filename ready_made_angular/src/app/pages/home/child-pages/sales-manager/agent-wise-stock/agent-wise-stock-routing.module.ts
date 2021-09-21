import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentWiseStockComponent } from './agent-wise-stock.component';

const routes: Routes = [{ path: '', component: AgentWiseStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentWiseStockRoutingModule { }
