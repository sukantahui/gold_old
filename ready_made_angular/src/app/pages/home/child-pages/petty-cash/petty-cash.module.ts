import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { PettyCashComponent } from './petty-cash.component';


@NgModule({
  declarations: [
    PettyCashComponent
  ],
  imports: [
    CommonModule,
    PettyCashRoutingModule
  ]
})
export class PettyCashModule { }
