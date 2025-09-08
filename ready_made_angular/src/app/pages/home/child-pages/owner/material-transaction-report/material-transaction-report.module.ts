import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialTransactionReportRoutingModule } from './material-transaction-report-routing.module';
import { MaterialTransactionReportComponent } from './material-transaction-report.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatIconModule} from '@angular/material/icon';
import {EmpRmFilterPipe} from '../../../../../pipes/emp-rm-filter.pipe';


@NgModule({
  declarations: [
    MaterialTransactionReportComponent,
    EmpRmFilterPipe
  ],
    imports: [
        CommonModule,
        MaterialTransactionReportRoutingModule,
        MatButtonToggleModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatFormFieldModule,
        MatDividerModule,
        MatInputModule,
        Ng2SearchPipeModule,
        MatIconModule
    ]
})
export class MaterialTransactionReportModule { }
