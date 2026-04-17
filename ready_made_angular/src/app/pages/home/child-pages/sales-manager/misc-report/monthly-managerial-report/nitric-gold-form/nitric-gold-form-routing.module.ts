import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NitricGoldFormComponent } from './nitric-gold-form.component';

const routes: Routes = [{ path: '', component: NitricGoldFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NitricGoldFormRoutingModule { }
