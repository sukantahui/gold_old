import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerCashWithdrawnComponent } from './manager-cash-withdrawn.component';

const routes: Routes = [{ path: '', component: ManagerCashWithdrawnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerCashWithdrawnRoutingModule { }
