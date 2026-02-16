import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscReportComponent } from './misc-report.component';
import {CustomerResolver} from '../../../../../resolvers/customer.resolver';
import {ProductReportComponent} from '../product-report/product-report.component';
import {JobReportResolver} from '../../../../../resolvers/job-report.resolver';

const routes: Routes = [
  { path: '', component: MiscReportComponent
    , children: [
      { path: 'CustomerDiscountReport'
        , loadChildren: () => import('./customer-discount-report/customer-discount-report.module').then(m => m.CustomerDiscountReportModule)
        , resolve: {customerResolvers: CustomerResolver}
      },
      { path: 'MonthlyManagerialReport'
        // tslint:disable-next-line:max-line-length
        , loadChildren: () => import('./monthly-managerial-report/monthly-managerial-report.module').then(m => m.MonthlyManagerialReportModule)
      },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscReportRoutingModule { }
