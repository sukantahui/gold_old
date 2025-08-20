import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerCashWithdrawnRoutingModule } from './manager-cash-withdrawn-routing.module';
import { ManagerCashWithdrawnComponent } from './manager-cash-withdrawn.component';


@NgModule({
  declarations: [
    ManagerCashWithdrawnComponent
  ],
  imports: [
    CommonModule,
    ManagerCashWithdrawnRoutingModule
  ]
})
export class ManagerCashWithdrawnModule { }
