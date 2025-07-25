import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpTransactionComponent } from './gp-transaction.component';

const routes: Routes = [{ path: '', component: GpTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpTransactionRoutingModule { }
