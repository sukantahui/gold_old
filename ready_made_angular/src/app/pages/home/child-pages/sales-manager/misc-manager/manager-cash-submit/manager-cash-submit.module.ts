import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerCashSubmitRoutingModule } from './manager-cash-submit-routing.module';
import { ManagerCashSubmitComponent } from './manager-cash-submit.component';


@NgModule({
  declarations: [
    ManagerCashSubmitComponent
  ],
  imports: [
    CommonModule,
    ManagerCashSubmitRoutingModule
  ]
})
export class ManagerCashSubmitModule { }
