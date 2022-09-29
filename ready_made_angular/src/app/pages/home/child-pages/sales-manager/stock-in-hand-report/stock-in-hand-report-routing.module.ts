import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockInHandReportComponent } from './stock-in-hand-report.component';

const routes: Routes = [{ path: '', component: StockInHandReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockInHandReportRoutingModule { }
