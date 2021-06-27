import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSalesManagerComponent } from './menu-sales-manager.component';
import {TransferToAgentComponent} from '../../child-pages/sales-manager/transfer-to-agent/transfer-to-agent.component';

const routes: Routes = [{ path: '', component: MenuSalesManagerComponent },
                        { path: 'TransferToAgent', component: TransferToAgentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuSalesManagerRoutingModule { }
