import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendRawMaterialToEmployeeComponent } from './send-raw-material-to-employee.component';

const routes: Routes = [{ path: '', component: SendRawMaterialToEmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendRawMaterialToEmployeeRoutingModule { }
