import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NitricGoldFormRoutingModule } from './nitric-gold-form-routing.module';
import { NitricGoldFormComponent } from './nitric-gold-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NitricGoldFormComponent
  ],
  exports: [
    NitricGoldFormComponent
  ],
  imports: [
    CommonModule,
    NitricGoldFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class NitricGoldFormModule { }
