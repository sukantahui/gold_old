import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashToManagerComponent } from './cash-to-manager.component';

const routes: Routes = [{ path: '', component: CashToManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashToManagerRoutingModule { }
