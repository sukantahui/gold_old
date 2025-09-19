import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanCreationRoutingModule } from './pan-creation-routing.module';
import { PanCreationComponent } from './pan-creation.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';
import {DalCreationModule} from '../dal-creation/dal-creation.module';


@NgModule({
  declarations: [
    PanCreationComponent
  ],
    imports: [
        CommonModule,
        PanCreationRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatTabsModule,
        NgSelectModule,
        MatButtonModule,
        DalCreationModule
    ]
})
export class PanCreationModule { }
