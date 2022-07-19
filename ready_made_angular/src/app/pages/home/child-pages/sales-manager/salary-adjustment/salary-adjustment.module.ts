import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryAdjustmentRoutingModule } from './salary-adjustment-routing.module';
import { SalaryAdjustmentComponent } from './salary-adjustment.component';


@NgModule({
  declarations: [
    SalaryAdjustmentComponent
  ],
  imports: [
    CommonModule,
    SalaryAdjustmentRoutingModule
  ]
})
export class SalaryAdjustmentModule { }
