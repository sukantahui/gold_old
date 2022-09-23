import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductReportComponent } from './product-report.component';

const routes: Routes = [
                          { path: '', component: ProductReportComponent
                            , children: [
                              { path: 'ProductSale'
                                , loadChildren: () => import('./product-sale/product-sale.module').then(m => m.ProductSaleModule)
                              }
                            ]
                          },
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReportRoutingModule { }
