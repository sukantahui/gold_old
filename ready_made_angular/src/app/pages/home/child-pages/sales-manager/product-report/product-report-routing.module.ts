import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductReportComponent } from './product-report.component';
import {ShowItemStockResolver} from '../../../../../resolvers/show-item-stock.resolver';
import {JobReportResolver} from '../../../../../resolvers/job-report.resolver';

const routes: Routes = [
                          { path: '', component: ProductReportComponent
                            , children: [
                              { path: 'ProductSale'
                                , loadChildren: () => import('./product-sale/product-sale.module').then(m => m.ProductSaleModule)
                              },
                              { path: 'DueReport'
                                , loadChildren: () => import('./due-report/due-report.module').then(m => m.DueReportModule)
                                , resolve: {dueReportResolver: JobReportResolver}
                              },
                              { path: 'JobReport'
                                , loadChildren: () => import('./job-report/job-report.module').then(m => m.JobReportModule)
                              }

                            ]
                          },
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReportRoutingModule { }
