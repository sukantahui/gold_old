import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleReturnRoutingModule } from './sale-return-routing.module';
import { SaleReturnComponent } from './sale-return.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    SaleReturnComponent
  ],
  imports: [
    CommonModule,
    SaleReturnRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule
  ]
})
export class SaleReturnModule { }
