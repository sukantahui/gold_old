import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LcReceiptRoutingModule } from './lc-receipt-routing.module';
import { LcReceiptComponent } from './lc-receipt.component';


@NgModule({
  declarations: [
    LcReceiptComponent
  ],
  imports: [
    CommonModule,
    LcReceiptRoutingModule
  ]
})
export class LcReceiptModule { }
