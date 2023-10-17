import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadymadeStockGroupwiseComponent } from './readymade-stock-groupwise.component';

const routes: Routes = [{ path: '', component: ReadymadeStockGroupwiseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadymadeStockGroupwiseRoutingModule { }
