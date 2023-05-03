import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerReceiptComponent } from './customer-receipt.component';
import {MiscReportComponent} from '../misc-report/misc-report.component';
import {CustomerResolver} from '../../../../../resolvers/customer.resolver';
import {CustomerReceiptResolver} from '../../../../../resolvers/customer-receipt.resolver';

const routes: Routes = [
  { path: '', component: CustomerReceiptComponent
    , children: [
      { path: 'LabourCharge'
        , loadChildren: () => import('./labour-charge/labour-charge.module').then(m => m.LabourChargeModule)
        , resolve: {customerReceiptResolver: CustomerReceiptResolver}
      },
      { path: 'GoldReceived'
        , loadChildren: () => import('./gold-received/gold-received.module').then(m => m.GoldReceivedModule)
        , resolve: {goldReceiptResolver: CustomerReceiptResolver}
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class CustomerReceiptRoutingModule { }
