import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryHolderComponent } from './salary-holder.component';

const routes: Routes = [{ path: '', component: SalaryHolderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryHolderRoutingModule { }
