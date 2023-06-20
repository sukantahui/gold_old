import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DalCreationRoutingModule } from './dal-creation-routing.module';
import { DalCreationComponent } from './dal-creation.component';


@NgModule({
  declarations: [
    DalCreationComponent
  ],
  imports: [
    CommonModule,
    DalCreationRoutingModule
  ]
})
export class DalCreationModule { }
