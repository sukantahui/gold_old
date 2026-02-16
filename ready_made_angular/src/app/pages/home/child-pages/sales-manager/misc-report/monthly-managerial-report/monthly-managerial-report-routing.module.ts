import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyManagerialReportComponent } from './monthly-managerial-report.component';

const routes: Routes = [{ path: '', component: MonthlyManagerialReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyManagerialReportRoutingModule { }
