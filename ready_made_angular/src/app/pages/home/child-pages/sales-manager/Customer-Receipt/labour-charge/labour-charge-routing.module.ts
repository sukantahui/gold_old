import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabourChargeComponent } from './labour-charge.component';

const routes: Routes = [{ path: '', component: LabourChargeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabourChargeRoutingModule { }
