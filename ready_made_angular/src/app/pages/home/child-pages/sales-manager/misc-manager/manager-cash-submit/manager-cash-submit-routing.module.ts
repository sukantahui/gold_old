import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerCashSubmitComponent } from './manager-cash-submit.component';

const routes: Routes = [{ path: '', component: ManagerCashSubmitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerCashSubmitRoutingModule { }
