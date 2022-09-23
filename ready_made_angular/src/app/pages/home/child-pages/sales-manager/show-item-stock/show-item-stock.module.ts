import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowItemStockRoutingModule } from './show-item-stock-routing.module';
import { ShowItemStockComponent } from './show-item-stock.component';


@NgModule({
  declarations: [
    ShowItemStockComponent
  ],
  imports: [
    CommonModule,
    ShowItemStockRoutingModule
  ]
})
export class ShowItemStockModule { }
