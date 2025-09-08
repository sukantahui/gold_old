import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialTransactionReportComponent } from './material-transaction-report.component';

const routes: Routes = [{ path: '', component: MaterialTransactionReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialTransactionReportRoutingModule { }
