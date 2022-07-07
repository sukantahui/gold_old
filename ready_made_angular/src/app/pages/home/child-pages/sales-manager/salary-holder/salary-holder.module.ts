import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryHolderRoutingModule } from './salary-holder-routing.module';
import { SalaryHolderComponent } from './salary-holder.component';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    SalaryHolderComponent
  ],
  imports: [
    CommonModule,
    SalaryHolderRoutingModule,
    FlexModule
  ]
})
export class SalaryHolderModule { }
