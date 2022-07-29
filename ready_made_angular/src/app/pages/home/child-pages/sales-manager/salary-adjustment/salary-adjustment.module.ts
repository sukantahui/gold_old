import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryAdjustmentRoutingModule } from './salary-adjustment-routing.module';
import { SalaryAdjustmentComponent } from './salary-adjustment.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    SalaryAdjustmentComponent
  ],
    imports: [
        CommonModule,
        SalaryAdjustmentRoutingModule,
        FormsModule,
        MatIconModule,
        NgxPrintModule
    ]
})
export class SalaryAdjustmentModule { }
