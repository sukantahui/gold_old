import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBillRoutingModule } from './create-bill-routing.module';
import { CreateBillComponent } from './create-bill.component';


@NgModule({
  declarations: [
    CreateBillComponent
  ],
  imports: [
    CommonModule,
    CreateBillRoutingModule
  ]
})
export class CreateBillModule { }
