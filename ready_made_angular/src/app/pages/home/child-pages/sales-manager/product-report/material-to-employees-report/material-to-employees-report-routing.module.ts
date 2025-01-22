import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialToEmployeesReportComponent } from './material-to-employees-report.component';

const routes: Routes = [{ path: '', component: MaterialToEmployeesReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialToEmployeesReportRoutingModule { }
