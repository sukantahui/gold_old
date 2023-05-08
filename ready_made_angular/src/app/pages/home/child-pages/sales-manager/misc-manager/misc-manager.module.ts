import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscManagerRoutingModule } from './misc-manager-routing.module';
import { MiscManagerComponent } from './misc-manager.component';


@NgModule({
  declarations: [
    MiscManagerComponent
  ],
  imports: [
    CommonModule,
    MiscManagerRoutingModule
  ]
})
export class MiscManagerModule { }
