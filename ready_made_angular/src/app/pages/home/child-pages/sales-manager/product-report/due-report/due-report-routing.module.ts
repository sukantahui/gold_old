import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueReportComponent } from './due-report.component';

const routes: Routes = [{ path: '', component: DueReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DueReportRoutingModule { }
