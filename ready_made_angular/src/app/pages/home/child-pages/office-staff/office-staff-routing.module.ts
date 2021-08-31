import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeStaffComponent } from './office-staff.component';

const routes: Routes = [{ path: '', component: OfficeStaffComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeStaffRoutingModule { }
