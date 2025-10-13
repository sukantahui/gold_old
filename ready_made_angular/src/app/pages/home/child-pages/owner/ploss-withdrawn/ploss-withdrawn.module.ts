import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlossWithdrawnRoutingModule } from './ploss-withdrawn-routing.module';
import { PlossWithdrawnComponent } from './ploss-withdrawn.component';


@NgModule({
  declarations: [
    PlossWithdrawnComponent
  ],
  imports: [
    CommonModule,
    PlossWithdrawnRoutingModule
  ]
})
export class PlossWithdrawnModule { }
