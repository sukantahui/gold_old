import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeStaffRoutingModule } from './office-staff-routing.module';
import { OfficeStaffComponent } from './office-staff.component';


@NgModule({
  declarations: [
    OfficeStaffComponent
  ],
  imports: [
    CommonModule,
    OfficeStaffRoutingModule
  ]
})
export class OfficeStaffModule { }
