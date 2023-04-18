import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerReceiptRoutingModule } from './customer-receipt-routing.module';
import { CustomerReceiptComponent } from './customer-receipt.component';



@NgModule({
  declarations: [
    CustomerReceiptComponent
  ],
    imports: [
        CommonModule,
        CustomerReceiptRoutingModule,
    ]
})
export class CustomerReceiptModule { }
