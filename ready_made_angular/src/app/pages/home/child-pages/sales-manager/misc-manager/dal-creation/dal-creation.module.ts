import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DalCreationRoutingModule } from './dal-creation-routing.module';
import { DalCreationComponent } from './dal-creation.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {NoCommaNumberPipe} from '../../../../../../pipes/no-comma-number-filter.pipes';


@NgModule({
    declarations: [
        DalCreationComponent, NoCommaNumberPipe
    ],
    exports: [
        NoCommaNumberPipe
    ],
    imports: [
        CommonModule,
        DalCreationRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatTabsModule,
        NgSelectModule,
        MatButtonModule
    ]
})
export class DalCreationModule { }
