import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabourChargeRoutingModule } from './labour-charge-routing.module';
import { LabourChargeComponent } from './labour-charge.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    LabourChargeComponent
  ],
    imports: [
        CommonModule,
        LabourChargeRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class LabourChargeModule { }
