import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentSalaryWithdrawRoutingModule } from './agent-salary-withdraw-routing.module';
import { AgentSalaryWithdrawComponent } from './agent-salary-withdraw.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ButtonModule} from 'primeng/button';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {LayoutModule} from '@angular/cdk/layout';
import {InputNumberModule} from 'primeng/inputnumber';


@NgModule({
  declarations: [
    AgentSalaryWithdrawComponent
  ],
  imports: [
    CommonModule,
    AgentSalaryWithdrawRoutingModule,
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
    ButtonModule,
    FlexModule,
    MatIconModule,
    MatSortModule,
    MatSlideToggleModule,
    NgxPrinterModule,
    NgxPrintModule,
    LayoutModule,
    InputNumberModule
  ]
})
export class AgentSalaryWithdrawModule { }
