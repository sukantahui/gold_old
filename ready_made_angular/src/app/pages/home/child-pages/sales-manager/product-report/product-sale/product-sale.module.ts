import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSaleRoutingModule } from './product-sale-routing.module';
import { ProductSaleComponent } from './product-sale.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductSaleComponent
  ],
  imports: [
    CommonModule,
    ProductSaleRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,

  ]
})
export class ProductSaleModule { }
