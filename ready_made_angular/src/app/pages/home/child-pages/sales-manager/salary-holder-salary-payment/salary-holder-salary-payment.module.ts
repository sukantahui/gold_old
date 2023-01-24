import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryHolderSalaryPaymentRoutingModule } from './salary-holder-salary-payment-routing.module';
import { SalaryHolderSalaryPaymentComponent } from './salary-holder-salary-payment.component';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {ButtonModule} from 'primeng/button';
import {MatSortModule} from '@angular/material/sort';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {LayoutModule} from '@angular/cdk/layout';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SalaryHolderSalaryPaymentComponent
  ],
  imports: [
    CommonModule,
    SalaryHolderSalaryPaymentRoutingModule,
    FlexModule,
    MatCardModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    MatIconModule,
    MatSortModule,
    MatSlideToggleModule,
    NgxPrinterModule,
    NgxPrintModule,
    LayoutModule,
    NgSelectModule,
    InputNumberModule,
  ]
})
export class SalaryHolderSalaryPaymentModule { }
