import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import {MaterialBalanceResolver} from '../../../../resolvers/material-balance.resolver';
import {MaterialResolver} from '../../../../resolvers/material.resolver';

const routes: Routes = [{ path: '', component: OwnerComponent
  , children: [
  { path: 'MaterialToManager'
    , loadChildren: () => import('./material-to-manager/material-to-manager.module').then(m => m.MaterialToManagerModule)
    , resolve: {materialResolver: MaterialResolver}
  },
  { path: 'MaterialFromManager'
    , loadChildren: () => import('./material-from-manager/material-from-manager.module').then(m => m.MaterialFromManagerModule)
    , resolve: {materialResolver: MaterialResolver}
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
