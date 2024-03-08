import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRefundToOwnwerRoutingModule } from './cash-refund-to-ownwer-routing.module';
import { CashRefundToOwnwerComponent } from './cash-refund-to-ownwer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    CashRefundToOwnwerComponent
  ],
  imports: [
    CommonModule,
    CashRefundToOwnwerRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    InputNumberModule
  ]
})
export class CashRefundToOwnwerModule { }
