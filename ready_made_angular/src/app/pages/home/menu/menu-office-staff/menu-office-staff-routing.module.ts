import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuOfficeStaffComponent } from './menu-office-staff.component';

const routes: Routes = [{ path: '', component: MenuOfficeStaffComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuOfficeStaffRoutingModule { }
