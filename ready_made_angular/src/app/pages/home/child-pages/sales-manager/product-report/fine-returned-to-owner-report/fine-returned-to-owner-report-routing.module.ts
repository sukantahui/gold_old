import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FineReturnedToOwnerReportComponent } from './fine-returned-to-owner-report.component';

const routes: Routes = [{ path: '', component: FineReturnedToOwnerReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FineReturnedToOwnerReportRoutingModule { }
