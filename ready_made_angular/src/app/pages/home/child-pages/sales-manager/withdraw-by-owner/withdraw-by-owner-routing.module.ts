import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawByOwnerComponent } from './withdraw-by-owner.component';

const routes: Routes = [{ path: '', component: WithdrawByOwnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawByOwnerRoutingModule { }
