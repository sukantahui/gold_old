import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiniDailyTransactionComponent } from './gini-daily-transaction.component';

const routes: Routes = [{ path: '', component: GiniDailyTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiniDailyTransactionRoutingModule { }
