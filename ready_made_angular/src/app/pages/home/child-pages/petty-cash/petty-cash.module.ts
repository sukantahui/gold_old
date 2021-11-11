import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { PettyCashComponent } from './petty-cash.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    PettyCashComponent
  ],
    imports: [
        CommonModule,
        PettyCashRoutingModule,
        MatCardModule,
        FlexModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule
    ]
})
export class PettyCashModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('en-in'); // DD/MM/YYYY
    }
}
