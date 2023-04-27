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
import {MatIconModule} from '@angular/material/icon';
import {NgxPrinterModule} from 'ngx-printer';
import {NgxPrintModule} from 'ngx-print';
import {TableModule} from 'primeng/table';


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
        MatButtonModule,
        MatIconModule,
        NgxPrinterModule,
        NgxPrintModule,
        TableModule
    ]
})
export class LabourChargeModule { }
