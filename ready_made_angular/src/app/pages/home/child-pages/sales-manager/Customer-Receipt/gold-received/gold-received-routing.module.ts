import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldReceivedComponent } from './gold-received.component';

const routes: Routes = [{ path: '', component: GoldReceivedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldReceivedRoutingModule { }
