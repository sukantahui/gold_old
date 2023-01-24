import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleReturnRoutingModule } from './sale-return-routing.module';
import { SaleReturnComponent } from './sale-return.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgSelectModule} from '@ng-select/ng-select';


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
    InputNumberModule,
    NgSelectModule
  ]
})
export class SaleReturnModule { }
