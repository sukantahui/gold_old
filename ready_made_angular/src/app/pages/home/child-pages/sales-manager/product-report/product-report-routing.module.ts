import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductReportComponent } from './product-report.component';
import {ShowItemStockResolver} from '../../../../../resolvers/show-item-stock.resolver';
import {JobReportResolver} from '../../../../../resolvers/job-report.resolver';
import {CustomerReceiptResolver} from '../../../../../resolvers/customer-receipt.resolver';
import {KarigarwiseJobReportResolver} from '../../../../../resolvers/karigarwise-job-report.resolver';

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
                              },
                              { path: 'FineReturnedToOwnerReport'
                                // tslint:disable-next-line:max-line-length
                                , loadChildren: () => import('./fine-returned-to-owner-report/fine-returned-to-owner-report.module').then(m => m.FineReturnedToOwnerReportModule)
                              },
                              { path: 'CashRefundToOwnwer'
                                // tslint:disable-next-line:max-line-length
                                , loadChildren: () => import('./cash-refund-to-ownwer/cash-refund-to-ownwer.module').then(m => m.CashRefundToOwnwerModule)
                              },
                              { path: 'JobDetailsReport'
                                // tslint:disable-next-line:max-line-length
                                , loadChildren: () => import('./job-details-report/job-details-report.module').then(m => m.JobDetailsReportModule)
                                , resolve: {karigarResolver: KarigarwiseJobReportResolver}
                              },


                            ]
                          },
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReportRoutingModule { }
