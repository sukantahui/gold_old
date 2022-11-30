import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraGoldAddComponent } from './extra-gold-add.component';

const routes: Routes = [{ path: '', component: ExtraGoldAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraGoldAddRoutingModule { }
