import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NitricToFineComponent } from './nitric-to-fine.component';

const routes: Routes = [{ path: '', component: NitricToFineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NitricToFineRoutingModule { }
