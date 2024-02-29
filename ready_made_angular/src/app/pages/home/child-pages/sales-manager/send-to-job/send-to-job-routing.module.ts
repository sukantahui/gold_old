import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendToJobComponent } from './send-to-job.component';

const routes: Routes = [{ path: '', component: SendToJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendToJobRoutingModule { }
