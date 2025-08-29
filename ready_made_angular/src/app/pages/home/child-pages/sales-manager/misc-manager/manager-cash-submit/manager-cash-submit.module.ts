import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerCashSubmitRoutingModule } from './manager-cash-submit-routing.module';
import { ManagerCashSubmitComponent } from './manager-cash-submit.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ManagerCashSubmitComponent
  ],
  imports: [
    CommonModule,
    ManagerCashSubmitRoutingModule,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule
  ]
})
export class ManagerCashSubmitModule { }
