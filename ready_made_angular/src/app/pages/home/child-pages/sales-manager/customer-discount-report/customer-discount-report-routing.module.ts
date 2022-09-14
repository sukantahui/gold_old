import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDiscountReportComponent } from './customer-discount-report.component';

const routes: Routes = [{ path: '', component: CustomerDiscountReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDiscountReportRoutingModule { }
