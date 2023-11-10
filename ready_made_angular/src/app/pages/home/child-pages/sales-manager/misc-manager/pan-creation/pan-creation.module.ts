import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanCreationRoutingModule } from './pan-creation-routing.module';
import { PanCreationComponent } from './pan-creation.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    PanCreationComponent
  ],
  imports: [
    CommonModule,
    PanCreationRoutingModule,
    MatTabsModule,
  ]
})
export class PanCreationModule { }
