import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryHolderSalaryPaymentComponent } from './salary-holder-salary-payment.component';

const routes: Routes = [{ path: '', component: SalaryHolderSalaryPaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryHolderSalaryPaymentRoutingModule { }
