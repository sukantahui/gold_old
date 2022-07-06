import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryHolderRoutingModule } from './salary-holder-routing.module';
import { SalaryHolderComponent } from './salary-holder.component';


@NgModule({
  declarations: [
    SalaryHolderComponent
  ],
  imports: [
    CommonModule,
    SalaryHolderRoutingModule
  ]
})
export class SalaryHolderModule { }
