import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabourChargeRoutingModule } from './labour-charge-routing.module';
import { LabourChargeComponent } from './labour-charge.component';


@NgModule({
  declarations: [
    LabourChargeComponent
  ],
  imports: [
    CommonModule,
    LabourChargeRoutingModule
  ]
})
export class LabourChargeModule { }
