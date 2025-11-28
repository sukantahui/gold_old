import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlossWithdrawnRoutingModule } from './ploss-withdrawn-routing.module';
import { PlossWithdrawnComponent } from './ploss-withdrawn.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {DalCreationModule} from '../../sales-manager/misc-manager/dal-creation/dal-creation.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    PlossWithdrawnComponent
  ],
    imports: [
        CommonModule,
        PlossWithdrawnRoutingModule,
        MatButtonToggleModule,
        MatTabsModule,
        DalCreationModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class PlossWithdrawnModule { }
