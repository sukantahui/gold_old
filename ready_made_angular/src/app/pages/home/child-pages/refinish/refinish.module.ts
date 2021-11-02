import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefinishRoutingModule } from './refinish-routing.module';
import { RefinishComponent } from './refinish.component';


@NgModule({
  declarations: [
    RefinishComponent
  ],
  imports: [
    CommonModule,
    RefinishRoutingModule
  ]
})
export class RefinishModule { }
