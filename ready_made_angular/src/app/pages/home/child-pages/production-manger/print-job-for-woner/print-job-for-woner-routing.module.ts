import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintJobForWonerComponent } from './print-job-for-woner.component';

const routes: Routes = [{ path: '', component: PrintJobForWonerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintJobForWonerRoutingModule { }
