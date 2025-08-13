import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivedRawMaterialFromEmployeeRoutingModule } from './received-raw-material-from-employee-routing.module';
import { ReceivedRawMaterialFromEmployeeComponent } from './received-raw-material-from-employee.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    ReceivedRawMaterialFromEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReceivedRawMaterialFromEmployeeRoutingModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatTabsModule,
    NgSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    FormsModule,
    MatDividerModule
  ]
})
export class ReceivedRawMaterialFromEmployeeModule { }
