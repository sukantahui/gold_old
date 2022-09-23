import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSaleComponent } from './product-sale.component';

const routes: Routes = [{ path: '', component: ProductSaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSaleRoutingModule { }
