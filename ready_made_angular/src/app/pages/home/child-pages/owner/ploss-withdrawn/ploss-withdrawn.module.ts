import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlossWithdrawnRoutingModule } from './ploss-withdrawn-routing.module';
import { PlossWithdrawnComponent } from './ploss-withdrawn.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {DalCreationModule} from '../../sales-manager/misc-manager/dal-creation/dal-creation.module';


@NgModule({
  declarations: [
    PlossWithdrawnComponent
  ],
    imports: [
        CommonModule,
        PlossWithdrawnRoutingModule,
        MatButtonToggleModule,
        MatTabsModule,
        DalCreationModule
    ]
})
export class PlossWithdrawnModule { }
