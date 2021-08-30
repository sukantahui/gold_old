import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionMangerRoutingModule } from './production-manger-routing.module';
import { ProductionMangerComponent } from './production-manger.component';


@NgModule({
  declarations: [
    ProductionMangerComponent
  ],
  imports: [
    CommonModule,
    ProductionMangerRoutingModule
  ]
})
export class ProductionMangerModule { }
