import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashToManagerRoutingModule } from './cash-to-manager-routing.module';
import { CashToManagerComponent } from './cash-to-manager.component';
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
    CashToManagerComponent
  ],
  imports: [
    CommonModule,
    CashToManagerRoutingModule,
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
export class CashToManagerModule { }
