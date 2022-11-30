import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperComponent } from './developer.component';
import {ProductReportComponent} from '../sales-manager/product-report/product-report.component';
import {JobReportResolver} from '../../../../resolvers/job-report.resolver';
import {DeveloperHomeComponent} from './developer-home/developer-home.component';

const routes: Routes = [
  { path: '', component: DeveloperComponent
    , children: [
      { path: 'extraGoldAdd'
        , loadChildren: () => import('./extra-gold-add/extra-gold-add-routing.module').then(m => m.ExtraGoldAddRoutingModule)
      },


    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
