import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReceiptComponent } from './customer-receipt.component';
import {MiscReportComponent} from '../misc-report/misc-report.component';
import {CustomerResolver} from '../../../../../resolvers/customer.resolver';

const routes: Routes = [
  { path: '', component: CustomerReceiptComponent
    , children: [
      { path: 'LabourCharge'
        , loadChildren: () => import('./labour-charge/labour-charge.module').then(m => m.LabourChargeModule)
        , resolve: {customerResolvers: CustomerResolver}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerReceiptRoutingModule { }
