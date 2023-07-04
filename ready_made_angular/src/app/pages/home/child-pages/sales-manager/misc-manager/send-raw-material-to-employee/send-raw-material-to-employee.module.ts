import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendRawMaterialToEmployeeRoutingModule } from './send-raw-material-to-employee-routing.module';
import { SendRawMaterialToEmployeeComponent } from './send-raw-material-to-employee.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SendRawMaterialToEmployeeComponent
  ],
    imports: [
        CommonModule,
        SendRawMaterialToEmployeeRoutingModule,
        MatTabsModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})
export class SendRawMaterialToEmployeeModule { }
