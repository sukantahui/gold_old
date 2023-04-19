import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReceiptHomeComponent } from './customer-receipt-home.component';

const routes: Routes = [{ path: '', component: CustomerReceiptHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerReceiptHomeRoutingModule { }
