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


@NgModule({
  declarations: [
    DalCreationComponent
  ],
    imports: [
        CommonModule,
        DalCreationRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatTabsModule,
        NgSelectModule
    ]
})
export class DalCreationModule { }
