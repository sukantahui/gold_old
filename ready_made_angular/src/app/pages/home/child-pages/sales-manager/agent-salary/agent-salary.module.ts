import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentSalaryRoutingModule } from './agent-salary-routing.module';
import { AgentSalaryComponent } from './agent-salary.component';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSortModule} from '@angular/material/sort';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {LayoutModule} from '@angular/cdk/layout';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AgentSalaryComponent
  ],
  imports: [
    CommonModule,
    AgentSalaryRoutingModule,
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
export class AgentSalaryModule { }
