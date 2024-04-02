import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsReportComponent } from './job-details-report.component';

const routes: Routes = [{ path: '', component: JobDetailsReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDetailsReportRoutingModule { }
