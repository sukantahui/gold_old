import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscManagerComponent } from './misc-manager.component';
import {CustomerReceiptResolver} from '../../../../../resolvers/customer-receipt.resolver';
import {MaterialBalanceResolver} from '../../../../../resolvers/material-balance.resolver';

const routes: Routes = [{ path: '', component: MiscManagerComponent
  , children: [
    { path: 'FineToNinetyTwo'
      , loadChildren: () => import('./fine-to-ninety-two/fine-to-ninety-two.module').then(m => m.FineToNinetyTwoModule)
      , resolve: {fineToNinetyTwoResolver: MaterialBalanceResolver}
    },
    { path: 'DalCreation'
      , loadChildren: () => import('./dal-creation/dal-creation.module').then(m => m.DalCreationModule)
      , resolve: {fineToNinetyTwoResolver: MaterialBalanceResolver}
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscManagerRoutingModule { }
