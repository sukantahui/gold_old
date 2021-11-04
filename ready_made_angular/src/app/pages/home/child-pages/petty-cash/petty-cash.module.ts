import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { PettyCashComponent } from './petty-cash.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PettyCashComponent
  ],
    imports: [
        CommonModule,
        PettyCashRoutingModule,
        MatCardModule,
        FlexModule,
        NgSelectModule
    ]
})
export class PettyCashModule { }
