import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivedRawMaterialFromEmployeeComponent } from './received-raw-material-from-employee.component';

const routes: Routes = [{ path: '', component: ReceivedRawMaterialFromEmployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivedRawMaterialFromEmployeeRoutingModule { }
