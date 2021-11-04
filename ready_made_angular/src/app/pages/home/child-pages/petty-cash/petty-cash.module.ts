import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { PettyCashComponent } from './petty-cash.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    PettyCashComponent
  ],
    imports: [
        CommonModule,
        PettyCashRoutingModule,
        MatCardModule,
        FlexModule
    ]
})
export class PettyCashModule { }
