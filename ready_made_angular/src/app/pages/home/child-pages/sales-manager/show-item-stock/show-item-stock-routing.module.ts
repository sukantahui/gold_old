import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowItemStockComponent } from './show-item-stock.component';

const routes: Routes = [{ path: '', component: ShowItemStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowItemStockRoutingModule { }
