import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DalCreationComponent } from './dal-creation.component';

const routes: Routes = [{ path: '', component: DalCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DalCreationRoutingModule { }
