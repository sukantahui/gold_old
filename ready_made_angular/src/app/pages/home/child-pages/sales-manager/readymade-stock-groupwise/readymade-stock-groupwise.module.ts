import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadymadeStockGroupwiseRoutingModule } from './readymade-stock-groupwise-routing.module';
import { ReadymadeStockGroupwiseComponent } from './readymade-stock-groupwise.component';
import {MatButtonModule} from '@angular/material/button';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ReadymadeStockGroupwiseComponent
  ],
    imports: [
        CommonModule,
        ReadymadeStockGroupwiseRoutingModule,
        MatButtonModule,
        TableModule,
        NgSelectModule,
        FlexModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
    ]
})
export class ReadymadeStockGroupwiseModule { }
