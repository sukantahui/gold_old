import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DalFormComponent } from './dal-form.component';

const routes: Routes = [{ path: '', component: DalFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DalFormRoutingModule { }
