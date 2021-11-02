import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingJobComponent } from './working-job.component';

const routes: Routes = [{ path: '', component: WorkingJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingJobRoutingModule { }
