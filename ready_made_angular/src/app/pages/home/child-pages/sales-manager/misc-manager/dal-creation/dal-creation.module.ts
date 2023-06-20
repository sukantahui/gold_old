import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DalCreationRoutingModule } from './dal-creation-routing.module';
import { DalCreationComponent } from './dal-creation.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    DalCreationComponent
  ],
    imports: [
        CommonModule,
        DalCreationRoutingModule,
        MatButtonToggleModule
    ]
})
export class DalCreationModule { }
