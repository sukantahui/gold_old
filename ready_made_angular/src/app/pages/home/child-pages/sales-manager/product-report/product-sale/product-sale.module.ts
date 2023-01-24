import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSaleRoutingModule } from './product-sale-routing.module';
import { ProductSaleComponent } from './product-sale.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatDateFormats, MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';


export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

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
    ButtonModule,
    TableModule,
    InputNumberModule,
  ],
  providers: [

    // { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },

  ],

})
export class ProductSaleModule { }
