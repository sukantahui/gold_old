import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopUpGoldComponent } from './top-up-gold.component';

const routes: Routes = [{ path: '', component: TopUpGoldComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopUpGoldRoutingModule { }
