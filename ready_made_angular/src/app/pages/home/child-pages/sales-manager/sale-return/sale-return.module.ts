import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleReturnRoutingModule } from './sale-return-routing.module';
import { SaleReturnComponent } from './sale-return.component';


@NgModule({
  declarations: [
    SaleReturnComponent
  ],
  imports: [
    CommonModule,
    SaleReturnRoutingModule
  ]
})
export class SaleReturnModule { }
