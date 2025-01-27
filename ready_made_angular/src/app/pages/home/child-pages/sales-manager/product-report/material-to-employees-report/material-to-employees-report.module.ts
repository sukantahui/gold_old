import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialToEmployeesReportRoutingModule } from './material-to-employees-report-routing.module';
import { MaterialToEmployeesReportComponent } from './material-to-employees-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatIconModule} from '@angular/material/icon';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    MaterialToEmployeesReportComponent
  ],
    imports: [
        CommonModule,
        MaterialToEmployeesReportRoutingModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        InputNumberModule,
        NgSelectModule,
        MatIconModule,
        NgxPrintModule
    ]
})
export class MaterialToEmployeesReportModule { }
