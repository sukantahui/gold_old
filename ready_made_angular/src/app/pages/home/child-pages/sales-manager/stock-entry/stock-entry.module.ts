import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockEntryRoutingModule } from './stock-entry-routing.module';
import { StockEntryComponent } from './stock-entry.component';


@NgModule({
  declarations: [
    StockEntryComponent
  ],
  imports: [
    CommonModule,
    StockEntryRoutingModule
  ]
})
export class StockEntryModule { }
