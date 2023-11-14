import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscManagerRoutingModule } from './misc-manager-routing.module';
import { MiscManagerComponent } from './misc-manager.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MiscManagerComponent
  ],
  imports: [
    CommonModule,
    MiscManagerRoutingModule,
    MatButtonModule
  ]
})
export class MiscManagerModule { }
