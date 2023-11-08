import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanCreationRoutingModule } from './pan-creation-routing.module';
import { PanCreationComponent } from './pan-creation.component';


@NgModule({
  declarations: [
    PanCreationComponent
  ],
  imports: [
    CommonModule,
    PanCreationRoutingModule
  ]
})
export class PanCreationModule { }
