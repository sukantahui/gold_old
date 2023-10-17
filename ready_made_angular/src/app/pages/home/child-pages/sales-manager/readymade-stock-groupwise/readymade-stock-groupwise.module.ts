import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadymadeStockGroupwiseRoutingModule } from './readymade-stock-groupwise-routing.module';
import { ReadymadeStockGroupwiseComponent } from './readymade-stock-groupwise.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ReadymadeStockGroupwiseComponent
  ],
    imports: [
        CommonModule,
        ReadymadeStockGroupwiseRoutingModule,
        MatButtonModule
    ]
})
export class ReadymadeStockGroupwiseModule { }
