import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerReceiptHomeRoutingModule } from './customer-receipt-home-routing.module';
import { CustomerReceiptHomeComponent } from './customer-receipt-home.component';


@NgModule({
  declarations: [
    CustomerReceiptHomeComponent
  ],
  imports: [
    CommonModule,
    CustomerReceiptHomeRoutingModule
  ]
})
export class CustomerReceiptHomeModule { }
