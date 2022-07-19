import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryAdjustmentComponent } from './salary-adjustment.component';

const routes: Routes = [{ path: '', component: SalaryAdjustmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryAdjustmentRoutingModule { }
