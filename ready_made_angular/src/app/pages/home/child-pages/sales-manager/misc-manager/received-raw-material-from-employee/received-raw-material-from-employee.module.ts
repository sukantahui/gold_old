import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivedRawMaterialFromEmployeeRoutingModule } from './received-raw-material-from-employee-routing.module';
import { ReceivedRawMaterialFromEmployeeComponent } from './received-raw-material-from-employee.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


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
    MatButtonToggleModule
  ]
})
export class ReceivedRawMaterialFromEmployeeModule { }
