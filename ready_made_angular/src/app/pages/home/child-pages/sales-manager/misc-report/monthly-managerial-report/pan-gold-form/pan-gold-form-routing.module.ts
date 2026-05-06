import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanGoldFormComponent } from './pan-gold-form.component';

const routes: Routes = [{ path: '', component: PanGoldFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanGoldFormRoutingModule { }
