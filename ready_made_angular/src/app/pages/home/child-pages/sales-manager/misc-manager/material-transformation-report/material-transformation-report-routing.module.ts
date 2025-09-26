import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialTransformationReportComponent } from './material-transformation-report.component';

const routes: Routes = [{ path: '', component: MaterialTransformationReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialTransformationReportRoutingModule { }
