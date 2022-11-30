import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraGoldAddRoutingModule } from './extra-gold-add-routing.module';
import { ExtraGoldAddComponent } from './extra-gold-add.component';


@NgModule({
  declarations: [
    ExtraGoldAddComponent
  ],
  imports: [
    CommonModule,
    ExtraGoldAddRoutingModule
  ]
})
export class ExtraGoldAddModule { }
