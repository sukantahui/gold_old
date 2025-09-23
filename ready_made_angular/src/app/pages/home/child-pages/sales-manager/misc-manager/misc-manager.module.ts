import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscManagerRoutingModule } from './misc-manager-routing.module';
import { MiscManagerComponent } from './misc-manager.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    MiscManagerComponent
  ],
    imports: [
        CommonModule,
        MiscManagerRoutingModule,
        MatButtonModule,
        MatListModule,
        MatIconModule
    ]
})
export class MiscManagerModule { }
