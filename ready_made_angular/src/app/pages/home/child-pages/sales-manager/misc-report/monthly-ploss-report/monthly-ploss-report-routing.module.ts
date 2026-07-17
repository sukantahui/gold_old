import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyPlossReportComponent } from './monthly-ploss-report.component';

const routes: Routes = [{ path: '', component: MonthlyPlossReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyPlossReportRoutingModule { }
